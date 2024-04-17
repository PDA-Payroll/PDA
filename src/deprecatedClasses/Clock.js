class Clock{

    get time(){//returns the current time
        const now = new Date();
        const time = now.getTime();
        return time;
    }
}