import React, { useLayoutEffect } from 'react';

import { createStage } from '../gameHelpers';

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';


import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris = () => {
    useLockBodyScroll(); // prevent scrolling

    return (
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage={createStage()} />
                <aside>
                    <div>
                        <Display text="Score" />
                        <Display text="Rows" />
                        <Display text="Level" />
                    </div>
                    <StartButton />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

function useLockBodyScroll() {
    useLayoutEffect(() => {
     // Get original body overflow
     const originalStyle = window.getComputedStyle(document.body).overflow;  
     // Prevent scrolling on mount
     document.body.style.overflow = 'hidden';
     // Re-enable scrolling when component unmounts
     return () => document.body.style.overflow = originalStyle;
     }, []); // Empty array ensures effect is only run on mount and unmount
}

export default Tetris;
