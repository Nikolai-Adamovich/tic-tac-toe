window.addEventListener('load', function() {
	var model = {
		root: document.querySelector('.tictactoe'),
		score: {
			cross: 0,
			zero: 0,
			draw: 0
		},
		active: 'cross',
		result: {},
		/*result: {
			winner: 'cross',
			line: [[0, 0], [0, 1], [0,2]]
		},*/
		board: [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		],
        emptyCellsCount: 9,
        winPositions: [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]]
        ]
	};
    function setCellsAttributes() {
        var table = model.root.querySelector('.board'),
            i,
            j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                table.rows[i].cells[j].setAttribute('data-row', i);
                table.rows[i].cells[j].setAttribute('data-column', j);
            }
        }
    }
    setCellsAttributes();
	function render() {
		var cross = model.root.querySelector('.left'),
			zero = model.root.querySelector('.right'),
			message = model.root.querySelector('.score'),
			table = model.root.querySelector('.board'),
			i,
			j;
		if (model.active === 'cross') {
			cross.classList.add('active');
			zero.classList.remove('active');
		} else {
			cross.classList.remove('active');
			zero.classList.add('active');
		}
		if (model.result.winner) {
			if (model.result.winner === 'draw') message.textContent = 'Ничья';
			else message.textContent = 'Победа';
		} else message.textContent = model.score.cross + ' : ' + model.score.zero;
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				var symbol = model.board[i][j],
					cell = table.rows[i].cells[j];
					cell.className = symbol || '';
			}
		}
		if (model.result.winner && model.result.line) {
			for (i = 0; i < 3; i++) {
				table.rows[model.result.line[i][0]].cells[model.result.line[i][1]].classList.add('active');
			}
		}
	}
    function reset() {
        model.result = {};
        model.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        model.emptyCellsCount = 9;
        render();
        model.root.addEventListener('click', move);
    }
	function checkGameEnd() {
        var i,
            j,
            values,
            row,
            cell;
        for (i = 0; i < model.winPositions.length; i++) {
			values = [null, null, null];
            for (j = 0; j < model.winPositions[i].length; j++) {
                row = model.winPositions[i][j][0];
                cell = model.winPositions[i][j][1];
				values[j] = model.board[row][cell];
                if (values[0] !== null && values[0] === values[1] && values[0] === values[2]) {
                    model.result.winner = values[0];
                    if (model.result.winner === 'cross') model.score.cross++;
                    else model.score.zero++;
                    model.active = model.active === 'cross' ? 'zero' : 'cross';
                    model.result.line = model.winPositions[i];
                    break;
                }
            }
        }
        if (model.emptyCellsCount === 0 && !model.result.winner) {
            model.result.winner = 'draw';
            model.score.draw++;
        }
        console.log(model.result.winner, model.emptyCellsCount);
        if (model.result.winner) {
            model.root.removeEventListener('click', move);
            setTimeout(reset, 3000);
        }
	}
    function move(e) {
        if (e.target.tagName === 'TD' && model.board[e.target.getAttribute('data-row')][e.target.getAttribute('data-column')] === null) {
            model.board[e.target.getAttribute('data-row')][e.target.getAttribute('data-column')] = model.active;
            model.active = model.active === 'cross' ? 'zero' : 'cross';
            model.emptyCellsCount--;
            checkGameEnd(e);
            render();
        }
    }
    reset()
});
