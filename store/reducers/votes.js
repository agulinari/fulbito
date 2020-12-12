import { POST_VOTE, SET_VOTES } from "../actions/votes";
import Vote from "../../models/vote";

const initialState = {
    votes: {}
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_VOTES:
            return {
                ...state,
                votes: { ...state.votes, [action.matchVotes.matchId]: action.matchVotes.votes }
            }
        case POST_VOTE:
            const newVote = new Vote(
                action.voteData.userId,
                action.voteData.scores,
                action.voteData.comment,
                action.voteData.terminator,
                action.voteData.antifairplay,
                action.voteData.goleador,
                action.voteData.fantasma
            );
            let updatedMatchVotes;
            if (!state.votes[action.voteData.matchId]) {
                updatedMatchVotes = [newVote];
            } else {
                updatedMatchVotes = state.votes[action.voteData.matchId].concat(newVote);
            }
            return {
                ...state,
                votes: { ...state.votes, [action.voteData.matchId]: updatedMatchVotes }
            };
    }

    return state;
};
