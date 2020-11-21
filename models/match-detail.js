class MatchDetail {
    constructor(id, title, date, place, 
        team1, team2, score1, score2, comments ) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.place = place;
        this.team1 = team1;
        this.team2 = team2;
        this.score1 = score1;
        this.score2 = score2;
        this.comments = comments
    }
}

export default MatchDetail;