SnakeHead = (function() {

    function SnakeHead(_pos)
    {
        var pos = _pos;

        this.move = function(_dir)
        {
            pos = G_model.makeMove(pos, _dir);
        }

        this.getPos = function()
        {
            return pos;
        }

        this.checkPos = function(_pos)
        {
            return pos.equal(_pos);
        }
    }

    return SnakeHead;
})();

SnakeBody = (function() {

    function SnakeBody(_bodySucc, _id)
    {
        var pos = Object.assign({}, _bodySucc.getPos());
        var succ = _bodySucc;
        var id = 'body-'+_id;

        this.move = function()
        {
            pos = Object.assign({}, succ.getPos());
        }

        this.getPos = function()
        {
            return pos;
        }

        this.getId = function()
        {
            return id;
        }

        this.checkPos = function(_pos)
        {
            return pos.equal(_pos);
        }
    }

    return SnakeBody;
})();


var SnakeModel = (function() {

    function SnakeModel(_nick, _pos)
    {
        var nick = _nick;
        var dir = [DIR_DOWN];
        var head = new SnakeHead(_pos);
        var body = [];
        var last_id = 0;

        this.getNickname = function()
        {
            return nick;
        };

        this.length = function()
        {
            return body.length;
        };

        // Funzione  richiamata dall'evento alla pressione di un tasto
        this.changeDir = function(_dir)
        {

            if(dir.last() === _dir) {
                return;
            }

            if(dir.length >= 3) {
                return;
            }

            if(body.length > 0 && (
               (dir.last() === DIR_LEFT && _dir === DIR_RIGHT ) ||
               (dir.last() === DIR_RIGHT && _dir === DIR_LEFT ) ||
               (dir.last() === DIR_UP && _dir === DIR_DOWN ) ||
               (dir.last() === DIR_DOWN && _dir === DIR_UP ))) {
                return;
            }

            dir.push(_dir);
        }

        this.getDir = function()
        {
            return dir[0];
        }

        // Funzione che viene chiamata nell'update del gioco al posto di move()
        // quando viene mangiato del cibo
        this.createBody = function()
        {
            if(body.length > 0) {
                body.push(new SnakeBody(body.last(), last_id++));
            } else {
                body.push(new SnakeBody(head, last_id++));
            }
        }

        // Funzione di aggiornamento dello snake nell'update del gioco
        this.move = function(hasEaten)
        {
            if(dir.length > 1) {
                dir.removeByIndex(0);
            }
            if(hasEaten) {
                this.createBody();
            }
            for (var i = body.length-1; i >= 0; --i) {
                body[i].move();
            }
            head.move(dir[0]);
        }

        this.getPos = function()
        {
            // restituire pos della testa
            return head.getPos();
        }

        this.checkPos = function(_pos)
        {
            var trovato = false;

            if(head.checkPos(_pos)) {
                trovato = true;
            }
            if(trovato)
                return trovato;
            return this.checkBodyPos(_pos);
        }

        this.checkBodyPos = function(_pos)
        {
            var trovato = false;
            var i = 0;
            while(!trovato && i < body.length) {
                if(body[i].checkPos(_pos)) {
                    trovato = true;
                }else{
                    i++;
                }
            }
            return trovato;
        }

        this.lastBodyId = function()
        {
            return last_id;
        }

        this.existsBody = function(_id)
        {
            var i = 0;
            var trovato = false;
            while (!trovato && i < body.length) {
                if (body[i].getId() === _id) {
                    trovato = body[i];
                }else{
                    i++;
                }
            }
            return trovato;
        }

        this.randomDir = function()
        {
            switch (parseInt(Math.random()*4)) {
                case 0:
                    this.changeDir(DIR_LEFT);
                    break;
                case 1:
                    this.changeDir(DIR_DOWN);
                    break;
                case 2:
                    this.changeDir(DIR_RIGHT);
                    break;
                case 3:
                    this.changeDir(DIR_UP);
                    break;
            }
        }
    }

    return SnakeModel;
})();
