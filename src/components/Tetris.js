import React, { useState } from 'react';

// used when we restart the game
import { createStage } from '../gameHelpers';

// styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

// custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

const Tetris = () => {
    //useLockBodyScroll(); // prevent scrolling

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    const movePlayer = (direction) => {
        updatePlayerPos({ x: direction, y: 0, collided: false });
    }

    const startGame = () => {
        // reset everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false });
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        console.log(keyCode)
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer(1);
            }
        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                {
                    gameOver? <Display gameOver={gameOver} text="Game Over" /> : (
                        <div>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                        </div>
                    )
                }
                <StartButton callBack={startGame} />
                    
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;
