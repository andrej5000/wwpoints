/**
 * Generic TicTacToe game mechanic. Happy playing.
 */
class TicTacToe {

    /**
     * Configuration object passed in from constructor
     *
     * @type {object}
     */
    config;


    /**
     * @param config {object}
     */
    constructor(config) {

        const {
            gameRasterHeight,
            gameRasterWidth,
            minRequiredWinningFields
        } = config;

        this.config = {
            ...config,
            minRequiredWinningFields: (gameRasterHeight || gameRasterWidth) < minRequiredWinningFields
                ? Math.min(gameRasterHeight, gameRasterWidth)
                : minRequiredWinningFields
        };

        this.gameRasterData = this.createGameRasterData();
    }


    /**
     * @returns {array|object[]} Sets overall game raster data
     */
    createGameRasterData() {

        const gameRasterData = [];

        for (let y = 0; y < this.config.gameRasterHeight; y++) {

            for (let x = 0; x < this.config.gameRasterWidth; x++) {

                gameRasterData.push(
                    {
                        x: x,
                        y: y,
                        isWinningSequenceCell: false,
                        value: false
                    }
                );
            }
        }

        return gameRasterData;
    }


    /**
     * Exposed/used from outside.
     *
     * @returns {array|object[]} Getter for overall game raster data
     */
    getGameRasterData() {

        return this.gameRasterData;
    }


    /**
     * Exposed/used from outside. Method called from embedding component, triggered when
     * a player clicks a cell in game raster.
     *
     * @param clickedCell {Object} Cell clicked by player
     * @param symbol {String} Symbol rendered into cell clicked by player (i.e. "X" or "O")
     * @returns {array|object[]} Cells reflecting a winning sequence
     */
    markCell(clickedCell, symbol) {

        // copy and set symbol
        const gameRasterData = [...this.gameRasterData];
        this.getCell(gameRasterData, clickedCell).value = symbol; // modification by reference

        const winningSequence = this.validateGameWinner(gameRasterData, clickedCell);

        if (winningSequence !== null) {

            winningSequence.forEach((winningCell) => {

                this.getCell(gameRasterData, winningCell).isWinningSequenceCell = true; // modification by reference
            });
        }

        this.gameRasterData = gameRasterData;

        return winningSequence;
    }


    /**
     * @param gameRasterData {array|object[]} Overall game raster data
     * @param coordinates {object} Single cell data record from gameRasterData
     * @returns {object} Found cell data at position from @param coordinates
     */
    getCell(gameRasterData, coordinates) {

        return gameRasterData.find((cell) => cell.x === coordinates.x && cell.y === coordinates.y);
    }


    /**
     * @param gameRasterData {array|object[]} Overall game raster data
     * @param cell {object} Data record of clicked cell
     * @returns {array|null} Returns null|winning sequence cells
     */
    validateGameWinner(gameRasterData, cell) {

        const winningCheckSequences = [

            // horizontal
            gameRasterData.filter((data) => data.y === cell.y),

            // vertical
            gameRasterData.filter((data) => data.x === cell.x),

            // diagonal top left
            this.getDiagonalSequence(
                gameRasterData,
                this.getDiagonalStartCoordinates(cell.x, cell.y, -1),
                1
            ),

            // diagonal top right
            this.getDiagonalSequence(
                gameRasterData,
                this.getDiagonalStartCoordinates(cell.x, cell.y, 1),
                -1
            )
        ];

        for (let i = 0; i < winningCheckSequences.length; i++) {

            const sequenceToCheck = winningCheckSequences[i];
            const winningSequence = TicTacToe.getWinningSequence(
                sequenceToCheck,
                this.config.minRequiredWinningFields
            );

            if (winningSequence !== null) {

                return winningSequence;
            }
        }

        return null;
    }


    /**
     * @param x {number}
     * @param y {number}
     * @param xModifier {number}
     * @returns {{x: number, y: number}}
     */
    getDiagonalStartCoordinates(x, y, xModifier) {

        const deltaX = xModifier === -1
            ? x
            : (this.config.gameRasterWidth - 1) - x;

        const min = Math.min(deltaX, y);

        const startX = x + (min * xModifier);
        const startY = y - min;

        return {
            x: startX,
            y: startY
        };
    }


    /**
     * @param gameRasterData {array|object[]} Overall game raster data
     * @param startCoordinates {object} Contains x amd y position of cell to start the sequence from
     * @param xModifier {Number} Direction to "move" when getting sequence
     * @returns {array} Array of cells from gameRasterData reflecting a sequence to be validated
     */
    getDiagonalSequence(gameRasterData, startCoordinates, xModifier) {

        const sequence = [];
        let coordinates = startCoordinates;
        let cell;

        do {
            cell = this.getCell(gameRasterData, coordinates);

            if (cell) {
                sequence.push(cell);
            }

            coordinates = {
                x: coordinates.x + xModifier,
                y: coordinates.y + 1
            };

        } while (cell);

        return sequence;
    }


    /**
     * @param sequence {array|object[]}
     * @param minRequiredFields {number} Minimum subsequent identical symbols to define a winning sequence
     * @return {{array|object[]}|null} Cells reflecting a winning sequence; null if none
     */
    static getWinningSequence(sequence, minRequiredFields) {

        let previousSymbol = null;
        let winningSequenceCells = [];

        for (let i = 0; i < sequence.length; i++) {

            const cell = sequence[i];

            // catching initial/empty cells
            if (cell.value === false) {
                previousSymbol = null;
                winningSequenceCells = [];
                continue;
            }

            if (previousSymbol === null || previousSymbol === cell.value) {
                winningSequenceCells.push(cell);
            } else {
                winningSequenceCells = [cell];
            }

            previousSymbol = cell.value;

            if (winningSequenceCells.length === minRequiredFields) {

                return winningSequenceCells;
            }
        }

        return null;
    }
}


export default TicTacToe;
