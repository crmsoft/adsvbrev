import React from 'react';

const Review = () => {
    return (
        <div className="game-review">
            <table className="game-review-header vote-positive">
                <tr>
                    <td>
                        <span className="icon-finger-up positive"></span>
                        <span className="icon-finger-down negative"></span>
                    </td>
                    <td className="pl-2">
                        username
                    </td>
                    <td>
                        <span className="icon-comment"></span>
                    </td>
                </tr>
            </table>

            <div className="game-review-content">
                <p>
                    Давно выяснено, что при оценке дизайна и 
                    композиции читаемый текст мешает сосредоточиться. 
                    Lorem Ipsum используют потому, что тот обеспечивает 
                    более или менее стандартное заполнение шаблона, 
                    а также реальное распределение букв
                </p>
            </div>

        </div>
    )
}

export default Review;