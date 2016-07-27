window.addEventListener('load', function() {
	var model = {
			root: document.querySelector('.tictactoe'),
			score: {
				cross: 0,
				zero: 0,
				draw: 0
			},
			active: 'cross',
			result: null,
			/*result: {
				winner: 'cross',
				line: [[0, 0], [0, 1], [0,2]]
			},*/
			board: [
				[null, null, null],
				[null, null, null],
				[null, null, null]
			]
		};
	function render() {
		var cross = model.root.querySelector('.left'),
			zero = model.root.querySelector('.right'),
			message = model.root.querySelector('.score'),
			table = model.root.querySelector('.board'),
			i,
			l;
		if (model.active === 'cross') {
			cross.classList.add('active');
			zero.classList.remove('active');
		} else {
			cross.classList.remove('active');
			zero.classList.add('active');
		}
		if (model.result) {
			if (model.result === 'draw') message.textContent = 'Ничья';
			else message.textContent = 'Победа';
		} else message.textContent = model.score.cross + ' : ' + model.score.zero;
		for (i = 0; i < 3; i++) {
			for (j = 0; j < 3; j++) {
				var symbol = model.board[i][j],
					cell = table.rows[i].cells[j];
					cell.className = symbol || '';
			}
		}
		if (model.result && model.result.line) {
			for (i = 0; i < 3; i++) {
				table.rows[model.result.line[i][0]].cells[model.result.line[i][1]].classList.add('active');
			}
		}
	}
	render();
});
