
<template>
<div class="wrapper">

      <div class="game-info">
        <div>Жизни: {{ lives }}</div>
        <div>Очки: {{ score }}</div>
        <!-- <div v-if="isInvincible">Неуязвимость: {{ invincibilityTimeLeft }} сек</div> -->
        <button @click="resetGame">Сбросить игру</button>
      </div>
      <div class="wrapper-game">
            <img class="house" src="@/assets/images/pacmen/house1.png" alt="">
    <div class="pacman-game">
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
            :class="[{
              'wall': cell === WALL,
              'outer-wall': isOuterWall(x, y),
              'dot': cell === DOT,
              'bonus1': cell === BONUS,  
                'bonus2': cell === BONUS2,   
                'bonus3': cell === BONUS3,          
              'power-pellet': cell === POWER_PELLET,
              // 'pacman': pacman.position.x === x && pacman.position.y === y,
              'ghost': ghosts.some(g => g.position.x === x && g.position.y === y),
              'invincible': isInvincible && pacman.position.x === x && pacman.position.y === y
            }, cell === BONUS ? getRandomNumber() : '' ]"
            @click="handleCellClick(x, y)"
          >
          <!-- power-pellet -->
            <span v-if="pacman.position.x === x && pacman.position.y === y" class="pacman-icon">
            <img class="pacmen" src="@/assets/images/pacmen/1.png" alt="">
            </span>

              <span v-if="cell === BONUS" class="bonus1-box">
            <img class="bonus-img" src="@/assets/images/pacmen/level1/bonus1.png" alt="">
            </span>
                 <span v-if="cell === BONUS2" class="bonus1-box">
            <img class="bonus-img" src="@/assets/images/pacmen/level1/bonus2.png" alt="">
            </span>
           <span v-if="cell === BONUS3" class="bonus1-box">
            <img class="bonus-img" src="@/assets/images/pacmen/level1/bonus3.png" alt="">
            </span>

            <span 
              v-for="(ghost, index) in ghosts.filter(g => g.position.x === x && g.position.y === y)" 
              :key="index"
              class="ghost-icon"
              :style="{ color: isInvincible ? 'blue' : ghost.color }"
            ><img class="ghost-img"  :src="ghost.monster" alt="">
          </span>

          </div>
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

  function getRandomNumber() {
  return `bonus-${Math.floor(Math.random() * 3) + 1}`
}
const TOTAL_BONUSES = 2;
const TOTAL_BONUSES2 = 2;
const TOTAL_BONUSES3 = 2;
  // Конфигурация игры
  const BOARD_WIDTH = 17;
const BOARD_HEIGHT = 15;
  const BOARD_SIZE = 17;
  const WALL = 1;
  const DOT = 2;
  const POWER_PELLET = 3;
  const BONUS = 4; // Красные бонусные точки
    const BONUS2 = 5;
      const BONUS3 = 6;
  const EMPTY = 0;
  
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
  
  // Вычисляемое свойство для оставшегося времени неуязвимости
  const invincibilityTimeLeft = computed(() => {
    return Math.max(0, Math.ceil((invincibilityEndTime.value - Date.now()) / 1000));
  });
  
  // Пакман
  const pacman = reactive({
    position: { x: 3, y: 1 },  
    direction: { x: 0, y: 0 },
    nextDirection: { x: 0, y: 0 }
  });
  
  // Привидения
  const ghosts = ref([
    { position: { x: 13, y: 13 }, direction: { x: -1, y: 0 }, color: 'red', speed: 200, monster: monster1 },
    { position: { x: 3, y: 13 }, direction: { x: 1, y: 0 }, color: 'pink', speed: 200, monster: monster2 },
    { position: { x: 7, y: 8 }, direction: { x: 0, y: 1 }, color: 'cyan', speed: 200, monster: monster3 },
    { position: { x: 9, y: 6 }, direction: { x: 0, y: 1 }, color: 'green', speed: 200, monster: monster1 },
  ]);

  const isOuterWall = (x, y) => {
  return board.value[y][x] === WALL && (
    x === 0 || 
    x === BOARD_WIDTH - 1 || 
    y === 0 || 
    y === BOARD_HEIGHT - 1
  );
};
  
  // Инициализация игрового поля
  const initBoard = () => {
  // Инициализация пустой доски
  board.value = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(EMPTY));

  // Внешние стены
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      if (x === 0 || x === BOARD_WIDTH - 1 || y === 0 || y === BOARD_HEIGHT - 1) {
        board.value[y][x] = WALL;
      }
    }
  }

  // Внутренний лабиринт (13 строк x 15 колонок)
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

  // 6. Создаем список всех возможных позиций для бонусов
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

  // 7. Размещаем ровно 6 бонусов в случайных местах
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


  // 8. Заполняем оставшиеся пустые места точками (DOT)
  for (let y = 1; y < BOARD_HEIGHT - 1; y++) {
    for (let x = 1; x < BOARD_WIDTH - 1; x++) {
      if (board.value[y][x] === EMPTY && 
          !(x === pacman.position.x && y === pacman.position.y) &&
          !ghosts.value.some(g => g.position.x === x && g.position.y === y)) {
        board.value[y][x] = DOT;
      }
    }
  }

  // Убедимся, что начальные позиции валидны
  // pacman.position = { x: Math.min(1, BOARD_WIDTH - 2), y: Math.min(1, BOARD_HEIGHT - 2) };
  
  ghosts.value = ghosts.value.map(ghost => ({
    ...ghost,
    position: {
      x: Math.min(ghost.position.x, BOARD_WIDTH - 2),
      y: Math.min(ghost.position.y, BOARD_HEIGHT - 2)
    }
  }));

  // Очищаем стартовые позиции
  clearPosition(pacman.position.x, pacman.position.y);
  ghosts.value.forEach(ghost => {
    clearPosition(ghost.position.x, ghost.position.y);
  });



  
};

// Безопасная очистка позиции
const clearPosition = (x, y) => {
  if (board.value[y] && board.value[y][x] !== undefined) {
    board.value[y][x] = EMPTY;
  }
};
  
  // Активация неуязвимости
  const activateInvincibility = () => {
    isInvincible.value = true;
    ghostSpeedMultiplier.value = 2; // Приведения двигаются быстрее
    invincibilityEndTime.value = Date.now() + 10000; // 10 секунд
    
    // Устанавливаем таймер для отключения неуязвимости
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
    pacman.direction = { x: 3, y: 0 };
    pacman.nextDirection = { x: 0, y: 0 };
    
    ghosts.value = [
    { position: { x: 13, y: 13 }, direction: { x: -1, y: 0 }, color: 'red', speed: 200, monster: monster1 },
    { position: { x: 3, y: 13 }, direction: { x: 1, y: 0 }, color: 'pink', speed: 200, monster: monster2 },
    { position: { x: 7, y: 8 }, direction: { x: 0, y: 1 }, color: 'cyan', speed: 200, monster: monster3 },
    { position: { x: 9, y: 6 }, direction: { x: 0, y: 1 }, color: 'green', speed: 200, monster: monster1 },
];
    
    initBoard();
    startGame();
  };
  
  // Проверка столкновений
  const checkCollisions = () => {
  // Создаем копию массива для безопасной итерации
  const currentGhosts = [...ghosts.value];
  
  // Проверяем каждого призрака
  for (const ghost of currentGhosts) {
    // Точное сравнение позиций с учетом возможного "проскакивания"
    const isColliding = (
      // Точное совпадение
      (ghost.position.x === pacman.position.x && ghost.position.y === pacman.position.y) ||
      // Либо призрак "проскочил" через Пакмана между кадрами
      (Math.abs(ghost.position.x - pacman.position.x) <= 1 && 
       Math.abs(ghost.position.y - pacman.position.y) <= 1 &&
       Math.abs(ghost.direction.x) + Math.abs(ghost.direction.y) > 1)
    );

    if (isColliding) {
      if (isInvincible.value) {
        // Удаляем призрака из оригинального массива
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
                position: { x: 8, y: 8 }, // Центр для возрождения
                direction: { x: [-1, 0, 1][Math.floor(Math.random()*3)], 
                            y: [-1, 0, 1][Math.floor(Math.random()*3)] }
              });
            }
          }, 5000);
        }
      } else {
        handlePacmanDeath();
        break; // Прерываем проверку после смерти
      }
    }
  }
};


const handlePacmanDeath = () => {
  lives.value--;
  if (lives.value <= 0) {
    gameOver.value = true;
    alert(`Игра окончена! Счет: ${score.value}`);
  } else {
    // Респавн персонажей
    pacman.position = { x: 3, y: 1 };
    pacman.direction = { x: 0, y: 0 };
    
    ghosts.value = [
    { position: { x: 13, y: 13 }, direction: { x: -1, y: 0 }, color: 'red', speed: 200, monster: monster1 },
    { position: { x: 3, y: 13 }, direction: { x: 1, y: 0 }, color: 'pink', speed: 200, monster: monster2 },
    { position: { x: 7, y: 8 }, direction: { x: 0, y: 1 }, color: 'cyan', speed: 200, monster: monster3 },
    { position: { x: 9, y: 6 }, direction: { x: 0, y: 1 }, color: 'green', speed: 200, monster: monster1 },
    ];
  }
};

  // Движение пакмана
  const movePacman = () => {
    if (gameOver.value) return;

// Проверяем следующее направление
const nextX = pacman.position.x + pacman.nextDirection.x;
const nextY = pacman.position.y + pacman.nextDirection.y;

if (isValidPosition(nextX, nextY) && board.value[nextY][nextX] !== WALL) {
  pacman.direction = { ...pacman.nextDirection };
}

// Двигаемся
const newX = pacman.position.x + pacman.direction.x;
const newY = pacman.position.y + pacman.direction.y;
if (isValidPosition(newX, newY)) {
    if (board.value[newY]?.[newX] !== WALL) {
      pacman.position.x = newX;
      pacman.position.y = newY;
      
      // Собираем точки и бонусы
      if (board.value[newY][newX] === DOT) {
        score.value += 10;
        board.value[newY][newX] = EMPTY;
      } else if (board.value[newY][newX] === POWER_PELLET) {
        score.value += 50;
        board.value[newY][newX] = EMPTY;
      } else if (board.value[newY][newX] === BONUS || board.value[newY][newX] === BONUS2 ||board.value[newY][newX] === BONUS3) {
        score.value += 100;
        board.value[newY][newX] = EMPTY;
        activateInvincibility();
      }
    }
    
    // Телепортация через туннели
    if (pacman.position.x < 0) pacman.position.x = BOARD_SIZE - 1;
    if (pacman.position.x >= BOARD_SIZE) pacman.position.x = 0;
    if (pacman.position.y < 0) pacman.position.y = BOARD_SIZE - 1;
    if (pacman.position.y >= BOARD_SIZE) pacman.position.y = 0;
  }
  };
  
  // Движение привидений
  const moveGhosts = () => {
  ghosts.value.forEach(ghost => {
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
    
    // Двигаем привидение (убрана проверка на скорость)
    ghost.position.x += ghost.direction.x;
    ghost.position.y += ghost.direction.y;
    
    // Телепортация через туннели
    if (ghost.position.x < 0) ghost.position.x = BOARD_SIZE - 1;
    if (ghost.position.x >= BOARD_SIZE) ghost.position.x = 0;
    if (ghost.position.y < 0) ghost.position.y = BOARD_SIZE - 1;
    if (ghost.position.y >= BOARD_SIZE) ghost.position.y = 0;
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
  
 // Игровой цикл - ИСПРАВЛЕННАЯ ВЕРСИЯ
let gameInterval;
let lastGhostMove = 0;
const GHOST_MOVE_INTERVAL = 500; // Интервал движения привидений (мс)

const PACMAN_MOVE_INTERVAL = 200; 
let lastPacmanMove = 0;

const startGame = () => {
  if (gameInterval) clearInterval(gameInterval);
  
  gameInterval = setInterval(() => {
    if (!gameOver.value) {
      const now = Date.now();

          if (now - lastPacmanMove > PACMAN_MOVE_INTERVAL) {
        movePacman();
        lastPacmanMove = now;
      }
      
      // Двигаем привидения с заданным интервалом
      if (now - lastGhostMove > GHOST_MOVE_INTERVAL / ghostSpeedMultiplier.value) {
        moveGhosts();
        lastGhostMove = now;
      }
      
      // Проверяем столкновения в каждом кадре
      checkCollisions();
    } else {
      clearInterval(gameInterval);
    }
  }, 16); // Основной цикл игры (частота обновления)
};
  
  
  // Обработка клика по ячейке (для мобильных устройств)


const touchStartX = ref(0);
const touchStartY = ref(0);
const touchEndX = ref(0);
const touchEndY = ref(0);

// Обработка начала касания
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
};

// Обработка окончания касания
const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].clientX;
  touchEndY.value = e.changedTouches[0].clientY;
  handleSwipe();
};

// Определение направления свайпа
const handleSwipe = () => {
  const dx = touchEndX.value - touchStartX.value;
  const dy = touchEndY.value - touchStartY.value;
  
  // Минимальная длина свайпа для регистрации
  const minSwipeDistance = 30;
  if (Math.sqrt(dx*dx + dy*dy) < minSwipeDistance) return;
  
  // Определяем угол свайпа (в градусах)
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  // Упрощенная логика для 8 направлений
  if (angle >= -22.5 && angle < 22.5) {
    // Свайп вправо → Движение влево
    pacman.nextDirection = { x: 1, y: 0 };
  } 
  else if (angle >= 22.5 && angle < 67.5) {
    // Свайп вправо-вниз → Движение вниз
   pacman.nextDirection = { x: 1, y: 0 };
  }
  else if (angle >= 67.5 && angle < 112.5) {
    // Свайп вниз → Движение вниз
    pacman.nextDirection = { x: 0, y: 1 };  }

  else if (angle >= 112.5 && angle < 157.5) {
    // Свайп влево-вниз → Движение вниз
     pacman.nextDirection = { x: 0, y: 1 };
  }
  else if (angle >= 157.5 || angle < -157.5) {
    // Свайп влево → Движение вправо
     pacman.nextDirection = { x: -1, y: 0 };
  }
  else if (angle >= -157.5 && angle < -112.5) {
    // Свайп влево-вверх → Движение влево
    pacman.nextDirection = { x: -1, y: 0 };
  }
  else if (angle >= -112.5 && angle < -67.5) {
    // Свайп вверх → Движение вверх
    pacman.nextDirection = { x: 0, y: -1 };
  }
  else if (angle >= -67.5 && angle < -22.5) {
    // Свайп вправо-вверх → Движение влево
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
  });
  
  onBeforeUnmount(() => {
    if (gameInterval) clearInterval(gameInterval);
    window.removeEventListener('keydown', handleKeyDown);

      window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
  });
  </script>
  
  <style scoped>
.wrapper-game{

  height: 180vw;
  position: relative;
  margin-top: 30vh;
}
.house{
  position: absolute;
  top: 0;
  left: 0;
  width: calc(var(--app-width)* 100 / 100);
}

.wrapper{
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
  
.game-board {
   
    transform: rotate(30deg) skewX(-30deg);
    width: calc(var(--app-width)* 72.8 / 100);
    height: calc(var(--app-width)* 55.6 / 100);
    transform-origin: top center;
    position: absolute;
    top: calc(var(--app-width)* 14 / 100);
    left: 122%;
    margin-left: calc(var(--app-width)* -80.2 / 100);
}
  .pacmen{
    transform: rotate(-41deg) skewX(7deg);
    position: absolute;
    width: 6.8vw;
    left: -5.9vw;
    bottom: -1.5vw;
    z-index: 9;
    height: 15vw;
  }

    .bonus-img{
transform: rotate(-47deg) skewX(7deg);
    position: absolute;
    width: 4.8vw;
    left: -1.1vw;
    bottom: -1.3vw;
    z-index: 9;
    height: 7.8vw;
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
  
  .cell.wall{
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
    width: 4px;
    height: 4px;
    background-color: #000000;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  .pacman-icon {
    color: yellow;
    font-weight: bold;
  }
  
 .invincible .pacmen {
  animation: blink 0.5s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
  
  .ghost-img {
    position: absolute;
    bottom: 0.3vw;
    left: -4.7vw;
    width: 8.9vw;
    transform: rotate(-52.5deg) skewX(-8deg);
    z-index: 9;
    height: 10vw;

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
  
  .outer-wall{
    background-color: #FF0000;
    width: 0;
    height: 0;
  }
  </style>