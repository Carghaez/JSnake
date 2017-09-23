/* CONSTANTS */
var BOARD_COLS = Math.floor(window.innerWidth / 30);
var BOARD_ROWS = Math.floor(window.innerHeight / 30);
var GRID_WIDTH = window.innerWidth / BOARD_COLS;
var GRID_HEIGHT = window.innerHeight / BOARD_ROWS;

var MAX_FOODS = 1;
var FOOD_TIPES = 13;

var DIR_LEFT = 0;
var DIR_RIGHT = 1;
var DIR_UP = 2;
var DIR_DOWN = 3;

var KEY_LEFT = 65;
var KEY_DOWN = 83;
var KEY_RIGHT = 68;
var KEY_UP = 87;

var KEY_PAUSE = 80; // P
var KEY_RESUME = 32; // SPACE_BAR
var KEY_START = 13; // ENTER

var GAME_INIT = 0;
var GAME_START = 1;
var GAME_PAUSE = 2;
var GAME_RESUME = 3;
var GAME_OVER = 4;

var GAME_UPDATE_INTERVAL = 200;
var GAME_SPAWN_FOOD = 300;

/* Globals */
var G_model;
var G_view;
var G_controller;

Array.prototype.last = function() {
     return this[this.length-1];
};

// La funzione removeByIndex rimuove l'elemento
// nella posizione passata come parametro
Array.prototype.removeByIndex = function(index) {
    if(index !== -1)
        this.splice(index, 1);
}

// la funzione remove() rimuove l'elemento passato
// dall'array
Array.prototype.remove = function(element) {
    if(element)
        this.splice(this.indexOf(element), 1);
}

Array.prototype.toggle = function(element) {
    if (this.contains(element)) {
        this.remove(element);
    } else {
        this.push(element);
    }
}

Array.prototype.contains = function(element) {
    return this.indexOf(element) !== -1;
}

function Position(_x, _y)
{
    this.x = _x;
    this.y = _y;

    this.equal = function(pos)
    {
        if(this.x == pos.x && this.y == pos.y)
            return true;
        return false;
    }
}
