import React from 'react';

const Review = ({review}) => {
    return (
        <div className="game-review">
            <table className="game-review-header vote-positive">
                <tbody>
                    <tr>
                        <td>
                            <span className="icon-finger-up positive"></span>
                            <span className="icon-finger-down negative"></span>
                        </td>
                        <td className="pl-2">
                            {review.user.username}
                        </td>
                        <td>
                            <span className="icon-comment"></span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="game-review-content">
                <p>
                    {review.text}
                </p>
            </div>

        </div>
    )
}

export default Review;