<template>
  <div class="wrapper">
      <div class="game-info">
        <div>Жизни: {{ lives }}</div>
        <div>Очки: {{ score }}</div>
        <button @click="resetGame">Сбросить игру</button>
      </div>
      <div class="wrapper-game">
            <img class="house" src="@/assets/images/pacmen/house1.png" alt="">
    <div class="pacman-game">
      <div class="game-board-container">
        <!-- Игровое поле -->
        <div class="game-board">
          <div 
            v-for="(row, y) in board" 
            :key="y" 
            class="row"
          >
            <div 
              v-for="(cell, x) in row" 
              :key="x" 
              class="cell"
              :class="{
                'wall': cell === WALL,
                'outer-wall': isOuterWall(x, y),
                'dot': cell === DOT,
                'bonus1': cell === BONUS,  
                'bonus2': cell === BONUS2,   
                'bonus3': cell === BONUS3,          
                'power-pellet': cell === POWER_PELLET
              }"
            >
              <span v-if="cell === BONUS" class="bonus1-box">
                <img class="bonus-img" src="@/assets/images/pacmen/level1/bonus1.png" alt="">
              </span>
              <span v-if="cell === BONUS2" class="bonus1-box">
                <img class="bonus-img" src="@/assets/images/pacmen/level1/bonus2.png" alt="">
              </span>
              <span v-if="cell === BONUS3" class="bonus1-box">
                <img class="bonus-img" src="@/assets/images/pacmen/level1/bonus3.png" alt="">
              </span>
            </div>
          </div>
        </div>

        <!-- Персонажи поверх игрового поля -->
        <div class="characters-layer">
          <img 
            class="pacman" 
            src="@/assets/images/pacmen/1.png" 
            alt=""
            :style="{
              transform: `translate(${pacman.renderX * cellWidth}vw, ${pacman.renderY * cellHeight}vw) rotate(${pacmanRotation}deg)`,
              filter: isInvincible ? 'brightness(1.5)' : 'none'
            }"
          >

          <img
            v-for="(ghost, index) in ghosts"
            :key="'ghost-' + index"
            class="ghost"
            :src="ghost.monster"
            alt=""
            :style="{
              transform: `translate(${ghost.renderX * cellWidth}vw, ${ghost.renderY * cellHeight}vw)`,
              filter: isInvincible ? 'hue-rotate(180deg) brightness(0.5)' : 'none'
            }"
          >
        </div>
      </div>
    </div>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
 //@ts-nocheck
  import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue';
  import monster1 from '@/assets/images/pacmen/m1.svg'
  import monster2 from '@/assets/images/pacmen/m2.svg'
  import monster3 from '@/assets/images/pacmen/m3.svg'
  
  const TOTAL_BONUSES = 2;
  const TOTAL_BONUSES2 = 2;
  const TOTAL_BONUSES3 = 2;
  
  // Конфигурация игры
  const BOARD_WIDTH = 17;
  const BOARD_HEIGHT = 15;
  const WALL = 1;
  const DOT = 2;
  const POWER_PELLET = 3;
  const BONUS = 4;
  const BONUS2 = 5;
  const BONUS3 = 6;
  const EMPTY = 0;
  
  // Размеры клетки в пикселях
  const cellWidth = 4.8;
  const cellHeight = 4.2;
  
  // Игровое поле
  const board = ref(Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(EMPTY)));
  
  // Состояние игры
  const lives = ref(3);
  const score = ref(0);
  const gameOver = ref(false);
  const gameStarted = ref(false);
  const isInvincible = ref(false);
  const invincibilityEndTime = ref(0);
  const ghostSpeedMultiplier = ref(1);
  const lastUpdateTime = ref(0);
  const animationFrameId = ref(0);
  
  // Пакман
  const pacman = reactive({
    position: { x: 3, y: 1 },
    renderX: 3,
    renderY: 1,
    direction: { x: 0, y: 0 },
    nextDirection: { x: 0, y: 0 },
    speed: 4 // клеток в секунду
  });
  
  // Привидения
  const ghosts = ref([
    { position: { x: 13, y: 13 }, renderX: 13, renderY: 13, direction: { x: -1, y: 0 }, color: 'red', speed: 2, monster: monster1 },
    { position: { x: 3, y: 13 }, renderX: 3, renderY: 13, direction: { x: 1, y: 0 }, color: 'pink', speed: 2, monster: monster2 },
    { position: { x: 7, y: 8 }, renderX: 7, renderY: 8, direction: { x: 0, y: 1 }, color: 'cyan', speed: 2, monster: monster3 },
    { position: { x: 9, y: 6 }, renderX: 9, renderY: 6, direction: { x: 0, y: 1 }, color: 'green', speed: 2, monster: monster1 },
  ]);
  
  // Вычисляемое свойство для поворота пакмана
  const pacmanRotation = computed(() => {
    if (pacman.direction.x === 1) return 0;
    if (pacman.direction.x === -1) return 180;
    if (pacman.direction.y === 1) return 90;
    if (pacman.direction.y === -1) return -90;
    return 0; // default
  });
  
  const isOuterWall = (x, y) => {
    return board.value[y][x] === WALL && (
      x === 0 || 
      x === BOARD_WIDTH - 1 || 
      y === 0 || 
      y === BOARD_HEIGHT - 1
    );
  };
  
  // Инициализация игрового поля (остается без изменений)
  const initBoard = () => {
    board.value = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(EMPTY));
  
    // Внешние стены
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (x === 0 || x === BOARD_WIDTH - 1 || y === 0 || y === BOARD_HEIGHT - 1) {
          board.value[y][x] = WALL;
        }
      }
    }
  
    // Внутренний лабиринт
    const maze = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,1 ,1],
      [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1,1 ,1],
      [1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1,1 ,1],
      [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,0 ,1],
      [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1,0 ,1],
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1,0 ,1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,0 ,1],
      [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,1 ,1],
      [1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1,1 ,1],
      [1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1,1 ,1],
      [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,1 ,1],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1,1 ,1],
      [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,1 ,1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1 ,1]
    ];
  
    // Заполняем доску
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        if (maze[y][x] === 1) {
          board.value[y][x] = WALL;
        }
      }
    }
  
    // Создаем список всех возможных позиций для бонусов
    const availablePositions = [];
    for (let y = 1; y < BOARD_HEIGHT - 1; y++) {
      for (let x = 1; x < BOARD_WIDTH - 1; x++) {
        if (board.value[y][x] !== WALL && 
            !(x === pacman.position.x && y === pacman.position.y) &&
            !ghosts.value.some(g => g.position.x === x && g.position.y === y)) {
          availablePositions.push({x, y});
        }
      }
    }
  
    // Размещаем бонусы в случайных местах
    for (let i = 0; i < TOTAL_BONUSES && availablePositions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const {x, y} = availablePositions.splice(randomIndex, 1)[0];
      board.value[y][x] = BONUS;
    }
  
    for (let i = 0; i < TOTAL_BONUSES2 && availablePositions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const {x, y} = availablePositions.splice(randomIndex, 1)[0];
      board.value[y][x] = BONUS2;
    }
  
    for (let i = 0; i < TOTAL_BONUSES3 && availablePositions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const {x, y} = availablePositions.splice(randomIndex, 1)[0];
      board.value[y][x] = BONUS3;
    }
  
    // Заполняем оставшиеся пустые места точками
    for (let y = 1; y < BOARD_HEIGHT - 1; y++) {
      for (let x = 1; x < BOARD_WIDTH - 1; x++) {
        if (board.value[y][x] === EMPTY && 
            !(x === pacman.position.x && y === pacman.position.y) &&
            !ghosts.value.some(g => g.position.x === x && g.position.y === y)) {
          board.value[y][x] = DOT;
        }
      }
    }
  };
  
  // Активация неуязвимости
  const activateInvincibility = () => {
    isInvincible.value = true;
    ghostSpeedMultiplier.value = 2;
    invincibilityEndTime.value = Date.now() + 10000;
    
    setTimeout(() => {
      isInvincible.value = false;
      ghostSpeedMultiplier.value = 1;
    }, 10000);
  };
  
  // Сброс игры
  const resetGame = () => {
    lives.value = 3;
    score.value = 0;
    gameOver.value = false;
    gameStarted.value = true;
    isInvincible.value = false;
    ghostSpeedMultiplier.value = 1;
    
    pacman.position = { x: 3, y: 1 };
    pacman.renderX = 3;
    pacman.renderY = 1;
    pacman.direction = { x: 0, y: 0 };
    pacman.nextDirection = { x: 0, y: 0 };
    
    ghosts.value = [
      { position: { x: 13, y: 13 }, renderX: 13, renderY: 13, direction: { x: -1, y: 0 }, color: 'red', speed: 2, monster: monster1 },
      { position: { x: 3, y: 13 }, renderX: 3, renderY: 13, direction: { x: 1, y: 0 }, color: 'pink', speed: 2, monster: monster2 },
      { position: { x: 7, y: 8 }, renderX: 7, renderY: 8, direction: { x: 0, y: 1 }, color: 'cyan', speed: 2, monster: monster3 },
      { position: { x: 9, y: 6 }, renderX: 9, renderY: 6, direction: { x: 0, y: 1 }, color: 'green', speed: 2, monster: monster1 },
    ];
    
    initBoard();
    startGame();
  };
  
  // Проверка столкновений
  const checkCollisions = () => {
    ghosts.value.forEach(ghost => {
      const distance = Math.sqrt(
        Math.pow(ghost.renderX - pacman.renderX, 2) + 
        Math.pow(ghost.renderY - pacman.renderY, 2)
      );
      
      if (distance < 0.8) { // Учитываем частичное перекрытие
        if (isInvincible.value) {
          // Удаляем призрака
          const index = ghosts.value.findIndex(g => 
            g.position.x === ghost.position.x && 
            g.position.y === ghost.position.y
          );
          
          if (index !== -1) {
            ghosts.value.splice(index, 1);
            score.value += 200;
            
            // Возрождение через 5 секунд
            setTimeout(() => {
              if (!gameOver.value) {
                ghosts.value.push({
                  ...ghost,
                  position: { x: 8, y: 8 },
                  renderX: 8,
                  renderY: 8,
                  direction: { 
                    x: [-1, 0, 1][Math.floor(Math.random()*3)], 
                    y: [-1, 0, 1][Math.floor(Math.random()*3)] 
                  }
                });
              }
            }, 5000);
          }
        } else {
          handlePacmanDeath();
        }
      }
    });
  };
  
  const handlePacmanDeath = () => {
    lives.value--;
    if (lives.value <= 0) {
      gameOver.value = true;
      alert(`Игра окончена! Счет: ${score.value}`);
    } else {
      // Респавн персонажей
      pacman.position = { x: 3, y: 1 };
      pacman.renderX = 3;
      pacman.renderY = 1;
      pacman.direction = { x: 0, y: 0 };
      
      ghosts.value = [
        { position: { x: 13, y: 13 }, renderX: 13, renderY: 13, direction: { x: -1, y: 0 }, color: 'red', speed: 2, monster: monster1 },
        { position: { x: 3, y: 13 }, renderX: 3, renderY: 13, direction: { x: 1, y: 0 }, color: 'pink', speed: 2, monster: monster2 },
        { position: { x: 7, y: 8 }, renderX: 7, renderY: 8, direction: { x: 0, y: 1 }, color: 'cyan', speed: 2, monster: monster3 },
        { position: { x: 9, y: 6 }, renderX: 9, renderY: 6, direction: { x: 0, y: 1 }, color: 'green', speed: 2, monster: monster1 },
      ];
    }
  };
  
  // Движение пакмана
  const movePacman = (deltaTime) => {
    if (gameOver.value) return;
  
    // Проверяем следующее направление
    const nextX = Math.floor(pacman.position.x + pacman.nextDirection.x);
    const nextY = Math.floor(pacman.position.y + pacman.nextDirection.y);
  
    if (isValidPosition(nextX, nextY)) {
      const cellValue = board.value[nextY]?.[nextX];
      if (cellValue !== undefined && cellValue !== WALL) {
        pacman.direction = { ...pacman.nextDirection };
      }
    }
  
    // Если нет направления - не двигаемся
    if (pacman.direction.x === 0 && pacman.direction.y === 0) return;
  
    // Рассчитываем новую позицию с учетом времени
    const moveDistance = pacman.speed * (deltaTime / 1000); // клеток за кадр
    const newRenderX = pacman.renderX + pacman.direction.x * moveDistance;
    const newRenderY = pacman.renderY + pacman.direction.y * moveDistance;
  
    // Проверяем, достигли ли мы следующей клетки
    const newCellX = Math.round(newRenderX);
    const newCellY = Math.round(newRenderY);
  
    // Если клетка изменилась, проверяем стену
    if (newCellX !== Math.round(pacman.renderX) || newCellY !== Math.round(pacman.renderY)) {
      if (!isValidPosition(newCellX, newCellY) || board.value[newCellY][newCellX] === WALL) {
        // Останавливаемся перед стеной
        pacman.renderX = Math.round(pacman.renderX);
        pacman.renderY = Math.round(pacman.renderY);
        pacman.position.x = Math.round(pacman.renderX);
        pacman.position.y = Math.round(pacman.renderY);
        pacman.direction = { x: 0, y: 0 };
        return;
      }
      
      // Обновляем позицию
      pacman.position.x = newCellX;
      pacman.position.y = newCellY;
      
      // Собираем точки и бонусы
      const cellValue = board.value[newCellY][newCellX];
      if (cellValue === DOT) {
        score.value += 10;
        board.value[newCellY][newCellX] = EMPTY;
      } else if (cellValue === POWER_PELLET) {
        score.value += 50;
        board.value[newCellY][newCellX] = EMPTY;
      } else if (cellValue === BONUS || cellValue === BONUS2 || cellValue === BONUS3) {
        score.value += 100;
        board.value[newCellY][newCellX] = EMPTY;
        activateInvincibility();
      }
    }
  
    // Обновляем рендер-позицию
    pacman.renderX = newRenderX;
    pacman.renderY = newRenderY;
  
    // Телепортация через туннели
    if (pacman.renderX < 0) {
      pacman.renderX = BOARD_WIDTH - 1;
      pacman.position.x = BOARD_WIDTH - 1;
    }
    if (pacman.renderX >= BOARD_WIDTH) {
      pacman.renderX = 0;
      pacman.position.x = 0;
    }
    if (pacman.renderY < 0) {
      pacman.renderY = BOARD_HEIGHT - 1;
      pacman.position.y = BOARD_HEIGHT - 1;
    }
    if (pacman.renderY >= BOARD_HEIGHT) {
      pacman.renderY = 0;
      pacman.position.y = 0;
    }
  };
  
  // Движение привидений
  const moveGhosts = (deltaTime) => {
    ghosts.value.forEach(ghost => {
      // Рассчитываем новую позицию с учетом времени
      const moveDistance = ghost.speed * ghostSpeedMultiplier.value * (deltaTime / 1000);
      const newRenderX = ghost.renderX + ghost.direction.x * moveDistance;
      const newRenderY = ghost.renderY + ghost.direction.y * moveDistance;
  
      // Проверяем, достигли ли мы следующей клетки
      const newCellX = Math.round(newRenderX);
      const newCellY = Math.round(newRenderY);
  
      // Если клетка изменилась, выбираем новое направление
      if (newCellX !== Math.round(ghost.renderX) || newCellY !== Math.round(ghost.renderY)) {
        ghost.position.x = newCellX;
        ghost.position.y = newCellY;
  
        // Простой ИИ для привидений - случайное направление
        const possibleDirections = [];
        
        // Проверяем доступные направления
        if (board.value[ghost.position.y - 1]?.[ghost.position.x] !== WALL) {
          possibleDirections.push({ x: 0, y: -1 });
        }
        if (board.value[ghost.position.y + 1]?.[ghost.position.x] !== WALL) {
          possibleDirections.push({ x: 0, y: 1 });
        }
        if (board.value[ghost.position.y]?.[ghost.position.x - 1] !== WALL) {
          possibleDirections.push({ x: -1, y: 0 });
        }
        if (board.value[ghost.position.y]?.[ghost.position.x + 1] !== WALL) {
          possibleDirections.push({ x: 1, y: 0 });
        }
        
        // Исключаем движение назад (если есть другие варианты)
        const oppositeDir = { x: -ghost.direction.x, y: -ghost.direction.y };
        const filteredDirections = possibleDirections.filter(dir => 
          !(dir.x === oppositeDir.x && dir.y === oppositeDir.y) || possibleDirections.length === 1
        );
        
        // Выбираем случайное направление из доступных
        if (filteredDirections.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredDirections.length);
          ghost.direction = filteredDirections[randomIndex];
        }
      }
  
      // Обновляем рендер-позицию
      ghost.renderX = newRenderX;
      ghost.renderY = newRenderY;
  
      // Телепортация через туннели
      if (ghost.renderX < 0) {
        ghost.renderX = BOARD_WIDTH - 1;
        ghost.position.x = BOARD_WIDTH - 1;
      }
      if (ghost.renderX >= BOARD_WIDTH) {
        ghost.renderX = 0;
        ghost.position.x = 0;
      }
      if (ghost.renderY < 0) {
        ghost.renderY = BOARD_HEIGHT - 1;
        ghost.position.y = BOARD_HEIGHT - 1;
      }
      if (ghost.renderY >= BOARD_HEIGHT) {
        ghost.renderY = 0;
        ghost.position.y = 0;
      }
    });
  };
  
  const isValidPosition = (x, y) => {
    return x >= 0 && x < BOARD_WIDTH && y >= 0 && y < BOARD_HEIGHT;
  };
  
  // Обработка нажатий клавиш
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        pacman.nextDirection = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        pacman.nextDirection = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        pacman.nextDirection = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        pacman.nextDirection = { x: 1, y: 0 };
        break;
    }
  };
  
  // Игровой цикл с requestAnimationFrame
  const gameLoop = (timestamp) => {
    if (!lastUpdateTime.value) {
      lastUpdateTime.value = timestamp;
    }
    
    const deltaTime = timestamp - lastUpdateTime.value;
    lastUpdateTime.value = timestamp;
  
    if (!gameOver.value) {
      movePacman(deltaTime);
      moveGhosts(deltaTime);
      checkCollisions();
    }
  
    animationFrameId.value = requestAnimationFrame(gameLoop);
  };
  
  const startGame = () => {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
    }
    lastUpdateTime.value = 0;
    animationFrameId.value = requestAnimationFrame(gameLoop);
  };
  
  // Обработка свайпов для мобильных устройств
  const touchStartX = ref(0);
  const touchStartY = ref(0);
  const touchEndX = ref(0);
  const touchEndY = ref(0);
  
  const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX;
    touchStartY.value = e.touches[0].clientY;
  };
  
  const handleTouchEnd = (e) => {
    touchEndX.value = e.changedTouches[0].clientX;
    touchEndY.value = e.changedTouches[0].clientY;
    handleSwipe();
  };
  
  const handleSwipe = () => {
    const dx = touchEndX.value - touchStartX.value;
    const dy = touchEndY.value - touchStartY.value;
    
    const minSwipeDistance = 30;
    if (Math.sqrt(dx*dx + dy*dy) < minSwipeDistance) return;
    
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    if (angle >= -22.5 && angle < 22.5) {
      pacman.nextDirection = { x: 1, y: 0 };
    } 
    else if (angle >= 22.5 && angle < 67.5) {
      pacman.nextDirection = { x: 1, y: 0 };
    }
    else if (angle >= 67.5 && angle < 112.5) {
      pacman.nextDirection = { x: 0, y: 1 };
    }
    else if (angle >= 112.5 && angle < 157.5) {
      pacman.nextDirection = { x: 0, y: 1 };
    }
    else if (angle >= 157.5 || angle < -157.5) {
      pacman.nextDirection = { x: -1, y: 0 };
    }
    else if (angle >= -157.5 && angle < -112.5) {
      pacman.nextDirection = { x: -1, y: 0 };
    }
    else if (angle >= -112.5 && angle < -67.5) {
      pacman.nextDirection = { x: 0, y: -1 };
    }
    else if (angle >= -67.5 && angle < -22.5) {
      pacman.nextDirection = { x: 0, y: -1 };
    }
  };
  
  // Хуки жизненного цикла
  onMounted(() => {
    initBoard();
    window.addEventListener('keydown', handleKeyDown);
  
    const gameBoard = document.querySelector('.wrapper');
    if (gameBoard) {
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    startGame();
  });
  
  onBeforeUnmount(() => {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value);
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
  });
  </script>
  
  <style scoped>
.wrapper-game {
  height: 180vw;
  position: relative;
  margin-top: 30vh;
}
.house {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(var(--app-width)* 100 / 100);
}

.wrapper {
  height: 100%;
  width: 100%;
  touch-action: none; 
  user-select: none;
  -webkit-user-select: none;
}

.pacman-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

.game-info {
  margin-bottom: 20px;
  font-size: 1.2em;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* Контейнер для игрового поля и персонажей */
.game-board-container {
  position: relative;
  transform: rotate(30deg) skewX(-30deg);
  width: calc(var(--app-width)* 72.8 / 100);
  height: calc(var(--app-width)* 55.6 / 100);
  transform-origin: top center;
  position: absolute;
  top: calc(var(--app-width)* 14 / 100);
  left: 122%;
  margin-left: calc(var(--app-width)* -80.2 / 100);
}

/* Слой с игровым полем */
.game-board {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Слой с персонажами */
.characters-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.row {
  display: flex;
}

.cell {
    width: 4.8vw;
    height: 4.2vw;
    box-sizing: border-box;
    position: relative;
    background-color: #7A7A7A;
  }

.wall {
  background-color: #c40000;
}

.cell.wall {
  background-color: transparent;
}

.dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background-color: #000000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.power-pellet::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: #000000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

/* Стили для персонажей */
.pacman {
  position: absolute;
  width: 28px;
  height: 28px;
  transition: transform 0.1s linear;
  z-index: 10;
  transform-origin: center;
  pointer-events: none;
  top: -8vw;
  left: -7vw;
}

.ghost {
  position: absolute;
  width: 28px;
  height: 28px;
  transition: transform 0.1s linear;
  z-index: 9;
  pointer-events: none;
  top: -8vw;
  left: -7vw;
}

.invincible {
  animation: blink 0.5s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.bonus-img {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 8;
}

button {
  padding: 5px 10px;
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.outer-wall {
  background-color: #FF0000;
  width: 0;
  height: 0;
}
</style>