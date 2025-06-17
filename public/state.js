export default {
    questions: [],
    inputMedia: [],
    results: [],
    pretest: {
        media: "",
        genre: "",
    },
    clear() {
        this.questions = [];
        this.inputMedia = [];
        this.results = [];
        this.pretest = {
            media: "",
            genre: "",
        };
    },
};
