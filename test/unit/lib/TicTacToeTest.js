import TicTacToe from '../../../src/libs/TicTacToe';


describe('TicTacToe', () => {

    let config,
        gameRasterData,
        ticTacToe;

    beforeEach(() => {

        config = {
            gameRasterHeight: 6,
            gameRasterWidth: 6,
            minRequiredWinningFields: 3
        };

        ticTacToe = new TicTacToe(config);

        gameRasterData = ticTacToe.gameRasterData;
    });


    describe('Constructor call', () => {

        it('constructor(): Check if constructor is called with config', () => {

            expect(ticTacToe.config)
                .toEqual(config);
        });


        it('constructor(): Fails gracefully if no config is passed', () => {

            const config = '123';
            let caughtError = '';

            try {

                ticTacToe = new TicTacToe(config);

            } catch (error) {

                caughtError = error;
            }

            expect(caughtError)
                .toEqual('constructor(): Expecting JSON config object but was not given');
        });


        it('constructor(): Conditionally adjusts minRequiredWinningFields according to width and height', () => {

            const config = {
                gameRasterHeight: 1, // dimension set is lower than minRequiredWinningFields
                gameRasterWidth: 2, // dimension set is lower than minRequiredWinningFields
                minRequiredWinningFields: 3
            };

            const ticTacToe = new TicTacToe(config);

            expect(ticTacToe.config.minRequiredWinningFields)
                .toEqual(1);
        });


        it('constructor(): Game raster data dimensions is as expected', () => {

            expect(ticTacToe.gameRasterData.length)
                .toEqual(config.gameRasterHeight * config.gameRasterWidth);
        });


        it('constructor(): Game raster data entities are consistent', () => {

            for (let y = 0; y < config.gameRasterHeight; y++) {

                for (let x = 0; x < config.gameRasterWidth; x++) {

                    const cell = gameRasterData.find((cell) => cell.x === x && cell.y === y);

                    expect(cell)
                        .toBeDefined();
                    expect(cell.isWinningSequenceCell)
                        .toBe(false);
                    expect(cell.value)
                        .toBe(false);
                }
            }
        });
    });


    describe('Inner functions', () => {

        it('createGameRasterData(): Creation of game raster data is triggered by function and result is OK', () => {

            expect(ticTacToe.createGameRasterData())
                .toEqual(gameRasterData);
        });


        it('getGameRasterData(): Getter for gameRasterData is working correctly', () => {

            expect(ticTacToe.getGameRasterData())
                .toEqual(gameRasterData);
        });


        it('getCell(): Gets data record from gameRasterData by coordinates', () => {

            const coordinates = {
                x: 0,
                y: 0
            };

            expect(ticTacToe.getCell(coordinates))
                .toEqual(gameRasterData[0]);
        });


        describe('Marking cells as winning streak or not, depending on matching win condition', () => {

            const symbol = 'X';
            const executeMarkCell = (cells) => {

                let result = null;

                cells.forEach((cell) => {
                    result = ticTacToe.markCell(cell, symbol);
                });

                return result;
            };


            describe('Win checks', () => {

                it('markCell(): Does mark game as won when horizontal condition is met', () => {

                    const cells = [
                        {
                            x: 0,
                            y: 0,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 1,
                            y: 0,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 2,
                            y: 0,
                            isWinningSequenceCell: false,
                            value: false
                        }
                    ];
                    let isWinningSequenceCell = null;
                    let value = null;

                    executeMarkCell(cells).forEach((cell) => {
                        isWinningSequenceCell = cell.isWinningSequenceCell;
                        value = cell.value;
                    });

                    expect(executeMarkCell(cells)).toHaveLength(3);
                    expect(isWinningSequenceCell).toEqual(true);
                    expect(value).toEqual(symbol);
                });


                it('markCell(): Does mark game as won when vertical condition is met', () => {

                    const cells = [
                        {
                            x: 0,
                            y: 0,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 0,
                            y: 1,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 0,
                            y: 2,
                            isWinningSequenceCell: false,
                            value: false
                        }
                    ];
                    let isWinningSequenceCell = null;
                    let value = null;

                    executeMarkCell(cells).forEach((cell) => {
                        isWinningSequenceCell = cell.isWinningSequenceCell;
                        value = cell.value;
                    });

                    expect(executeMarkCell(cells)).toHaveLength(3);
                    expect(isWinningSequenceCell).toEqual(true);
                    expect(value).toEqual(symbol);
                });


                it('markCell(): Does mark game as won when diagonal BOTTOM-LEFT condition is met', () => {

                    const cells = [
                        {
                            x: 0,
                            y: 4,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 1,
                            y: 3,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 2,
                            y: 2,
                            isWinningSequenceCell: false,
                            value: false
                        }
                    ];

                    let isWinningSequenceCell = null;
                    let value = null;

                    executeMarkCell(cells).forEach((cell) => {
                        isWinningSequenceCell = cell.isWinningSequenceCell;
                        value = cell.value;
                    });

                    expect(executeMarkCell(cells)).toHaveLength(3);
                    expect(isWinningSequenceCell).toEqual(true);
                    expect(value).toEqual(symbol);
                });


                it('markCell(): Does mark game as won when diagonal BOTTOM-RIGHT condition is met', () => {

                    const cells = [
                        {
                            x: 0,
                            y: 1,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 1,
                            y: 2,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 2,
                            y: 3,
                            isWinningSequenceCell: false,
                            value: false
                        }
                    ];

                    let isWinningSequenceCell = null;
                    let value = null;

                    executeMarkCell(cells).forEach((cell) => {
                        isWinningSequenceCell = cell.isWinningSequenceCell;
                        value = cell.value;
                    });

                    expect(executeMarkCell(cells)).toHaveLength(3);
                    expect(isWinningSequenceCell).toEqual(true);
                    expect(value).toEqual(symbol);
                });


                it('markCell(): Does mark game as won when diagonal TOP-LEFT condition is met', () => {

                    const cells = [
                        {
                            x: 3,
                            y: 3,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 2,
                            y: 2,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 1,
                            y: 1,
                            isWinningSequenceCell: false,
                            value: false
                        }
                    ];

                    let isWinningSequenceCell = null;
                    let value = null;

                    executeMarkCell(cells).forEach((cell) => {
                        isWinningSequenceCell = cell.isWinningSequenceCell;
                        value = cell.value;
                    });

                    expect(executeMarkCell(cells)).toHaveLength(3);
                    expect(isWinningSequenceCell).toEqual(true);
                    expect(value).toEqual(symbol);
                });


                it('markCell(): Does mark game as won when diagonal TOP-RIGHT condition is met', () => {

                    const cells = [
                        {
                            x: 3,
                            y: 3,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 2,
                            y: 4,
                            isWinningSequenceCell: false,
                            value: false
                        },
                        {
                            x: 1,
                            y: 5,
                            isWinningSequenceCell: false,
                            value: false
                        }
                    ];

                    let isWinningSequenceCell = null;
                    let value = null;

                    executeMarkCell(cells).forEach((cell) => {
                        isWinningSequenceCell = cell.isWinningSequenceCell;
                        value = cell.value;
                    });

                    expect(executeMarkCell(cells)).toHaveLength(3);
                    expect(isWinningSequenceCell).toEqual(true);
                    expect(value).toEqual(symbol);
                });
            });


        });
    });
});
