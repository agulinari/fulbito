import Vote from "../../models/vote";

export const POST_VOTE = 'POST_VOTE';
export const SET_VOTES = 'SET_VOTES';

export const fetchVotes = (matchId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token;
            const response = await fetch(`https://fulbito-7d71e.firebaseio.com/votes/${matchId}.json?auth=${token}`);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedVotes = [];

            for (const key in resData) {
                loadedVotes.push(
                    new Vote(
                        resData[key].userId,
                        resData[key].scores,
                        resData[key].comment,
                        resData[key].terminator,
                        resData[key].antifairplay,
                        resData[key].goleador,
                        resData[key].fantasma
                    )
                );
            }
            dispatch({ 
                type: SET_VOTES, 
                matchVotes: { 
                    matchId: matchId, 
                    votes: loadedVotes 
                }
            });
        } catch (err) {
            throw err;
        }
    }
}

export const postVote = (matchId, userId, scores, comment, terminator, antifairplay, goleador, fantasma) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://fulbito-7d71e.firebaseio.com/votes/${matchId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                scores,
                comment,
                terminator,
                antifairplay,
                goleador,
                fantasma
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: POST_VOTE,
            voteData: {
                matchId: matchId,
                userId: userId,
                scores: scores,
                comment: comment,
                terminator: terminator,
                antifairplay: antifairplay,
                goleador: goleador,
                fantasma: fantasma
            }
        })
    };
    return;
};