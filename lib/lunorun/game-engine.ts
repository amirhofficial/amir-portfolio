import {
  GAME,
  type Obstacle,
  type Player,
} from './types';

export class LunoRunEngine {
  width = 0;
  height = 0;
  distance = 0;

  // Explicitly typed as number because speed changes during gameplay.
  speed: number = GAME.initialSpeed;

  player: Player =
    this.createPlayer();

  obstacles: Obstacle[] = [];

  private spawnTimer = 1.4;
  private nextId = 1;
  private patternIndex = 0;

  resize(
    width: number,
    height: number,
  ) {
    this.width =
      Math.max(1, width);

    this.height =
      Math.max(1, height);

    this.player.x =
      Math.max(
        90,
        this.width * 0.16,
      );
  }

  groundY() {
    return Math.max(
      150,
      this.height -
        GAME.groundHeight,
    );
  }

  reset() {
    this.distance = 0;

    this.speed =
      GAME.initialSpeed;

    this.spawnTimer = 1.35;
    this.nextId = 1;
    this.patternIndex = 0;
    this.obstacles = [];

    this.player =
      this.createPlayer();

    this.player.x =
      Math.max(
        90,
        this.width * 0.16,
      );
  }

  jump() {
    if (this.player.grounded) {
      this.player.grounded =
        false;

      this.player.jumps = 1;

      this.player.vy =
        GAME.jumpVelocity;

      return true;
    }

    if (
      this.player.jumps === 1
    ) {
      this.player.jumps = 2;

      this.player.vy =
        GAME.doubleJumpVelocity;

      return true;
    }

    return false;
  }

  update(dt: number) {
    if (dt <= 0) {
      return;
    }

    this.distance +=
      this.speed *
      dt *
      0.1;

    this.speed = Math.min(
      GAME.maxSpeed,
      GAME.initialSpeed +
        this.distance *
          GAME.speedPerMeter,
    );

    this.updatePlayer(dt);
    this.updateObstacles(dt);

    this.spawnTimer -= dt;

    if (
      this.spawnTimer <= 0
    ) {
      this.spawnPattern();

      this.spawnTimer =
        this.getNextSpawnDelay();
    }
  }

  collides() {
    const ground =
      this.groundY();

    const playerLeft =
      this.player.x + 6;

    const playerRight =
      this.player.x +
      GAME.playerWidth -
      7;

    const playerTop =
      ground -
      GAME.playerHeight -
      this.player.y +
      9;

    const playerBottom =
      ground -
      2 -
      this.player.y;

    return this.obstacles.some(
      (obstacle) => {
        const left =
          obstacle.x + 5;

        const right =
          obstacle.x +
          obstacle.width -
          5;

        const top =
          ground -
          obstacle.height +
          6;

        const bottom =
          ground;

        return (
          playerRight >
            left &&
          playerLeft <
            right &&
          playerBottom >
            top &&
          playerTop <
            bottom
        );
      },
    );
  }

  private createPlayer(): Player {
    return {
      x: 120,
      y: 0,
      vy: 0,
      grounded: true,
      jumps: 0,
    };
  }

  private updatePlayer(
    dt: number,
  ) {
    this.player.vy -=
      GAME.gravity * dt;

    this.player.y +=
      this.player.vy * dt;

    if (
      this.player.y <= 0
    ) {
      this.player.y = 0;
      this.player.vy = 0;
      this.player.grounded =
        true;
      this.player.jumps = 0;
    } else {
      this.player.grounded =
        false;
    }
  }

  private updateObstacles(
    dt: number,
  ) {
    for (
      const obstacle of
        this.obstacles
    ) {
      obstacle.x -=
        this.speed * dt;
    }

    this.obstacles =
      this.obstacles.filter(
        (obstacle) =>
          obstacle.x +
            obstacle.width >
          -80,
      );
  }

  private getNextSpawnDelay() {
    const difficulty =
      Math.min(
        1,
        this.distance / 4000,
      );

    const min =
      GAME.minSpawn -
      difficulty * 0.15;

    const max =
      GAME.maxSpawn -
      difficulty * 0.22;

    return (
      min +
      Math.random() *
        Math.max(
          0.18,
          max - min,
        )
    );
  }

  private spawnPattern() {
    const start =
      this.width + 100;

    const patterns = [
      [
        {
          type: 1 as const,
          width: 38,
          height: 54,
        },
      ],

      [
        {
          type: 2 as const,
          width: 54,
          height: 64,
        },
      ],

      [
        {
          type: 3 as const,
          width: 74,
          height: 46,
        },
      ],

      [
        {
          type: 1 as const,
          width: 34,
          height: 48,
        },
        {
          type: 2 as const,
          width: 46,
          height: 58,
        },
      ],
    ];

    const pattern =
      patterns[
        this.patternIndex %
          patterns.length
      ];

    this.patternIndex += 1;

    let x = start;

    pattern.forEach(
      (item, index) => {
        if (index > 0) {
          x +=
            150 +
            Math.random() * 70;
        }

        this.obstacles.push({
          id: this.nextId++,
          ...item,
          x,
        });
      },
    );
  }
}