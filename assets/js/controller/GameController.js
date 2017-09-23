function GameController()
{
    this.status = GAME_INIT;
    this.game_interval;
    this.xDown = null;
    this.yDown = null;
    this.time = null;

    this.init = function(_nick)
    {
        G_model = new Model(BOARD_COLS, BOARD_ROWS);
        G_model.init(_nick);
        G_view = new View(GRID_WIDTH, GRID_HEIGHT);
        G_view.init();

        this.game_interval = window.setInterval(function(){
            G_controller.update();
        }, this.getInterval());

        window.setInterval(function() {
            if(G_controller.status === GAME_START ||
               G_controller.status === GAME_RESUME
            ){
                G_model.foods.make();
            }
        }, GAME_SPAWN_FOOD);

        window.addEventListener('keydown', function(e) {
            var e = e || window.event;
            G_controller.inputHandler(e.keyCode);
        }, true);

        document.addEventListener('touchstart', function(e) {
            G_controller.handleTouchStart(e);
        }, false);

        document.addEventListener('touchmove', function(e) {
            G_controller.handleTouchMove(e);
        }, false);

    }

    this.changeStatus = function(_status)
    {
        if(this.status === _status)
            return;

        // Inizio Gioco
        if(this.status === GAME_INIT) {
            if (_status === GAME_START) {
                console.log('Game Start!');
                this.status = _status;
            }
        }
        // Gioco in pausa
        if(this.status === GAME_START || this.status === GAME_RESUME) {
            if (_status === GAME_PAUSE) {
                console.log('Game Paused');
                this.status = _status;
            }
        }
        // Gioco riesumato
        if(this.status === GAME_PAUSE) {
            if (_status === GAME_RESUME) {
                console.log('Game Resume');
                this.status = _status;
            }
        }
    }

    this.inputHandler = function(keyCode)
    {
        switch (keyCode)
        {
            case KEY_LEFT:
                G_model.changeSnakeDir(DIR_LEFT);
                break;
            case KEY_DOWN:
                G_model.changeSnakeDir(DIR_DOWN);
                break;
            case KEY_RIGHT:
                G_model.changeSnakeDir(DIR_RIGHT);
                break;
            case KEY_UP:
                G_model.changeSnakeDir(DIR_UP);
                break;
            case KEY_PAUSE:
                this.changeStatus(GAME_PAUSE);
                break;
            case KEY_RESUME:
                this.changeStatus(GAME_RESUME);
                break;
            case KEY_START:
                this.changeStatus(GAME_START);
                break;
            default:
                console.log(keyCode);
                break;
        }
    }

    this.handleTouchStart = function(e)
    {
        if(this.status == GAME_INIT) {
            this.changeStatus(GAME_START);
        } else {
            if(e.touches.length > 1) {
                // Gioco in pausa
                if(this.status === GAME_START || this.status === GAME_RESUME) {
                    this.status = GAME_PAUSE;
                } else {
                    // Gioco riesumato
                    if(this.status === GAME_PAUSE) {
                        this.status = GAME_RESUME;
                    }
                }
            } else {
                this.xDown = e.touches[0].clientX;
                this.yDown = e.touches[0].clientY;
                this.time = Date.now();
            }
        }
    }

    this.handleTouchMove = function(e)
    {
        if(this.status === GAME_START || this.status === GAME_RESUME) {
            var xDelta = this.xDown -  e.touches[0].clientX;
            var yDelta = this.yDown -  e.touches[0].clientY;

            if(Math.abs(xDelta) > 10 || Math.abs(yDelta) > 10) {
                var tDelta = Date.now() - this.time;
                xDelta /= tDelta;
                yDelta /= tDelta;
                var pxlRt = (window.devicePixelRatio || 3) / 20;
                if(Math.abs(xDelta) > pxlRt || Math.abs(yDelta) > pxlRt) {
                    if ( Math.abs( xDelta ) > Math.abs( yDelta ) ) {
                        if ( xDelta > 0 ) {
                            G_model.changeSnakeDir(DIR_LEFT);
                        } else {
                            G_model.changeSnakeDir(DIR_RIGHT);
                        }
                    } else {
                        if ( yDelta > 0 ) {
                            G_model.changeSnakeDir(DIR_UP);
                        } else {
                            G_model.changeSnakeDir(DIR_DOWN);
                        }
                    }
                }
                this.xDown = e.touches[0].clientX;
                this.yDown = e.touches[0].clientY;
                this.time = Date.now();
            }

        }
        e.preventDefault();
        return;
    }

    this.getInterval = function()
    {
        return GAME_UPDATE_INTERVAL - (G_model.snake.length() * 1.2);
    }

    this.updateInterval = function()
    {
        clearInterval(this.game_interval);
        this.game_interval = window.setInterval(function(){
            G_controller.update();
        }, this.getInterval());
    }

    this.update = function()
    {
        if(G_controller.status === GAME_START ||
           G_controller.status === GAME_RESUME
        ) {
            G_model.update();
            G_view.update();
            if(G_model.checkGameOver()) {
                this.status = GAME_OVER;
                console.log('Game Over!');
                clearInterval(this.game_interval);
                G_view.updateScore();
            } else {
                this.updateInterval();
            }
        }
    }
}