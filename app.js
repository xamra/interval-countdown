
function multipleCountdowns() {
    return {
        timerInterval: 1,
        timeList: [],
        countdownObjects: [],
        startedAllButtonDisabled: false,
        setInit() {
            let i = 0;
            let val = "";
            while (i < 60) {
                if (i < 10) {
                    val = "0" + i;
                } else {
                    val = i;
                }
                this.timeList.push(val);
                i += this.timerInterval;
            }
        },

        addTimer() {
            let timerValues = [];
            let times = document.querySelectorAll(".select");
            let timerObject = {};
            times.forEach((element) => {
                timerValues.push(element.options[element.selectedIndex].value);
            });

            if (timerValues.join(":") != "00:00:00") {
                timerObject.id = uniqueID();
                timerObject.initValues = timerValues;
                timerObject.initClockValue = timerValues.join(":");
                timerObject.values = timerValues;
                timerObject.clockValue = timerValues.join(":");
                timerObject.started = false;
                timerObject.done = false;
                timerObject.countdownTimerID = null;
                timerObject.startButtonDisabled = false;
                timerObject.pauseButtonDisabled = true;
                timerObject.resetButtonDisabled = true;
                timerObject.deleteButtonDisabled = false;
                this.countdownObjects.push(timerObject);
            }
        },

        startTimer(timerID) {
            let ind = 0;
            let timerIndex = this.countdownObjects.findIndex((element) => {
                return element.id === timerID;
            });

            if ((this.countdownObjects[timerIndex].started == true && this.countdownObjects[timerIndex].countdownTimerID != undefined)
                || this.countdownObjects[timerIndex].clockValue == "00:00:00") {
                console.log("prevented second start " + this.countdownObjects[index].id)
                return;
            }

            this.countdownObjects[timerIndex].startButtonDisabled = true;
            this.countdownObjects[timerIndex].pauseButtonDisabled = false;
            this.countdownObjects[timerIndex].resetButtonDisabled = true;
            this.countdownObjects[timerIndex].deleteButtonDisabled = true;
            this.countdownObjects[timerIndex].started = true;

            const intervalID = setInterval(() => {
                timerIndex = this.countdownObjects.findIndex((element) => {
                    return element.id === timerID;
                });

                ind++;
                let seconds = stringToTime(this.countdownObjects[timerIndex].clockValue, "sec");

                seconds--;
                let to = secondsToTime(seconds);

                this.countdownObjects[timerIndex].clockValue = to.hour + ":" + to.min + ":" + to.sec;
                if (seconds == 0) {
                    ClearInterval(intervalID);
                    // this.resetTimer(e) // vielleicht feature einbauen ? --> autoreset checkbox

                    this.countdownObjects[timerIndex].startButtonDisabled = true;
                    this.countdownObjects[timerIndex].pauseButtonDisabled = true;
                    this.countdownObjects[timerIndex].resetButtonDisabled = false;
                    this.countdownObjects[timerIndex].deleteButtonDisabled = false;
                    this.countdownObjects[timerIndex].started = false;
                    this.countdownObjects[timerIndex].done = true;
                    return;
                }
            }, 1000);
            this.countdownObjects[timerIndex].countdownTimerID = intervalID;
        },

        pauseTimer(timerID) {
            let ind = 0;
            let timerIndex = this.countdownObjects.findIndex((element) => {
                return element.id === timerID;
            });
            this.countdownObjects[timerIndex].startButtonDisabled = false;
            this.countdownObjects[timerIndex].pauseButtonDisabled = true;
            this.countdownObjects[timerIndex].resetButtonDisabled = false;
            this.countdownObjects[timerIndex].deleteButtonDisabled = false;
            this.countdownObjects[timerIndex].started = false;
            this.countdownObjects[timerIndex].done = false;
            ClearInterval(this.countdownObjects[timerIndex].countdownTimerID);
        },

        resetTimer(timerID) {
            let timerIndex = this.countdownObjects.findIndex((element) => {
                return element.id === timerID;
            });
            this.countdownObjects[timerIndex].startButtonDisabled = false;
            this.countdownObjects[timerIndex].pauseButtonDisabled = true;
            this.countdownObjects[timerIndex].resetButtonDisabled = true;
            this.countdownObjects[timerIndex].deleteButtonDisabled = false;
            this.countdownObjects[timerIndex].done = false;
            this.countdownObjects[timerIndex].values = this.countdownObjects[timerIndex].initValues;
            this.countdownObjects[timerIndex].clockValue = (this.countdownObjects[timerIndex].initValues).join(":");
        },

        deleteTimer(timerID) {
            let timerIndex = this.countdownObjects.findIndex((element) => {
                return element.id === timerID;
            });
            ClearInterval(this.countdownObjects[timerIndex].countdownTimerID);
            this.countdownObjects.splice(timerIndex, 1);
        },


        /////// ---------------------------------------
        startAllTogether() {
            this.countdownObjects.forEach((timerElement) => {

                if ((timerElement.started == true && timerElement.countdownTimerID != undefined)
                    || timerElement.clockValue == "00:00:00") {
                    console.log("prevented second start " + timerElement.id)
                    return;

                }
                timerElement.startButtonDisabled = true;
                timerElement.pauseButtonDisabled = false;
                timerElement.resetButtonDisabled = true;
                timerElement.deleteButtonDisabled = true;
                timerElement.started = true;
                startedAllButtonDisabled = true;

                const intervalID = setInterval(() => {

                    timerIndex = this.countdownObjects.findIndex((element) => {
                        return element.id === timerElement.id;
                    });

                    let seconds = stringToTime(this.countdownObjects[timerIndex].clockValue, "sec");
                    seconds--;
                    let to = secondsToTime(seconds);
                    this.countdownObjects[timerIndex].clockValue = to.hour + ":" + to.min + ":" + to.sec;
                    if (seconds == 0) {
                        ClearInterval(intervalID);
                        // this.resetTimer(e) // vielleicht feature einbauen ? --> autoreset checkbox

                        this.countdownObjects[timerIndex].startButtonDisabled = true;
                        this.countdownObjects[timerIndex].pauseButtonDisabled = true;
                        this.countdownObjects[timerIndex].resetButtonDisabled = false;
                        this.countdownObjects[timerIndex].deleteButtonDisabled = false;
                        this.countdownObjects[timerIndex].started = false;
                        this.countdownObjects[timerIndex].done = true;
                        return;
                    }
                }, 1000);
                timerElement.countdownTimerID = intervalID;
            });
        },

        startAllInSequence(timerIndex) {

            if (timerIndex == 0) {
                this.resetAll();
            }

            let ind = 0;
            let timerID = this.countdownObjects[timerIndex].id;

            if ((this.countdownObjects[timerIndex].started == true && this.countdownObjects[timerIndex].countdownTimerID != undefined) 
            || this.countdownObjects[timerIndex].clockValue == "00:00:00") {
                console.log("prevented second start " + this.countdownObjects[index].id)
                return;
            }

            this.countdownObjects[timerIndex].startButtonDisabled = true;
            this.countdownObjects[timerIndex].pauseButtonDisabled = false;
            this.countdownObjects[timerIndex].resetButtonDisabled = true;
            this.countdownObjects[timerIndex].deleteButtonDisabled = true;
            this.countdownObjects[timerIndex].started = true;
            this.countdownObjects[timerIndex].done = false;
            startedAllButtonDisabled = true;

            const intervalID = setInterval(() => {

                let realTimerIndex = this.countdownObjects.findIndex((element) => {
                    return element.id === timerID;
                });

                ind++;
                let seconds = stringToTime(this.countdownObjects[realTimerIndex].clockValue, "sec");

                seconds--;
                if (seconds >= 0) {
                    let to = secondsToTime(seconds);
                    this.countdownObjects[realTimerIndex].clockValue = to.hour + ":" + to.min + ":" + to.sec;
                }

                if (seconds == 0) {
                    ClearInterval(intervalID);
                    // this.resetTimer(e) // vielleicht feature einbauen ? --> autoreset checkbox

                    this.countdownObjects[realTimerIndex].startButtonDisabled = true;
                    this.countdownObjects[realTimerIndex].pauseButtonDisabled = true;
                    this.countdownObjects[realTimerIndex].resetButtonDisabled = false;
                    this.countdownObjects[realTimerIndex].deleteButtonDisabled = false;
                    this.countdownObjects[realTimerIndex].started = false;
                    this.countdownObjects[realTimerIndex].done = true;

                    if (this.countdownObjects.length - 1 == realTimerIndex) {
                        return;
                    } else {
                        realTimerIndex++;
                        this.startAllInSequence(realTimerIndex);
                    }
                }
            }, 1000);
            this.countdownObjects[timerIndex].countdownTimerID = intervalID;
        },

        stopAll() {
            this.countdownObjects.forEach((element) => {
                element.startButtonDisabled = false;
                element.pauseButtonDisabled = true;
                element.resetButtonDisabled = false;
                element.deleteButtonDisabled = false;
                element.started = false;
                element.done = false;
                ClearInterval(element.countdownTimerID);
                element.countdownTimerID = null;
            });
            startedAllButtonDisabled = false;
        },

        resetAll() {
            this.countdownObjects.forEach((element) => {
                element.started = false;
                ClearInterval(element.countdownTimerID);
                element.countdownTimerID = null;
                element.values = element.initValues;
                element.clockValue = (element.initValues).join(":");
                element.startButtonDisabled = false;
                element.pauseButtonDisabled = true;
                element.resetButtonDisabled = true;
                element.deleteButtonDisabled = false;
                element.done = false;
            });
            startedAllButtonDisabled = false;
        },

        deleteAll() {
            this.countdownObjects.forEach((element) => {
                ClearInterval(element.countdownTimerID);
            });
            this.countdownObjects = [];
        }
    }
}

function ClearInterval(intervalID) {
    clearInterval(intervalID);
}

function uniqueID() {
    return Date.now() + "T" + Math.floor(Math.random() * 100000);
}


// str 00:00 format sec/min
function stringToTime(str, format) {
    let hour = 0;
    let min = 0;
    let sec = 0;
    if (str && format) {
        let splitted = str.split(":");
        if (format == "sec") {
            hour = parseInt(splitted[0]);
            hour = calculateTime(hour, "hour", "sec");
            min = parseInt(splitted[1]);
            min = calculateTime(min, "min", "sec");
            sec = parseInt(splitted[2]);
            seconds = hour + min + sec;
            //console.log(seconds);
            return seconds;
        } else {

        }
    }
    return;
}

// 01:02:45 --> 3765s = 62,75m
// 23:23:23 --> 84203 = 1403,333m
function secondsToTime(sec) {
    let s = Math.floor(sec % 60);
    let m = Math.floor((sec / 60) % 60);
    let h = Math.floor((sec / 60 / 60) % 60);
    let d = Math.floor((sec / 60 / 60 / 24) % 24);
    if (s < 10) {
        s = "0" + s;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (h < 10) {
        h = "0" + h;
    }
    if (d < 10) {
        d = "0" + d;
    }
    return { "sec": s, "min": m, "hour": h, "days": d };
}


function calculateTime(num, formatFrom, formatTo) {
    if ((formatFrom == "hour" && formatTo == "min") || (formatFrom == "min" && formatTo == "sec")) {
        return num * 60;
    } else if ((formatFrom == "min" && formatTo == "hour") || (formatFrom == "sec" && formatTo == "min")) {
        return num / 60;
    } else if (formatFrom == "hour" && formatTo == "sec") {
        return num * 3600;
    } else if (formatFrom == "sec" && formatTo == "hour") {
        return num / 3600;
    }
    return;
}

// 00:30 -> 30 sec
// 01:45 -> 105 sec oder 1,75 Min
