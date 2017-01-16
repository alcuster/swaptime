import { SelectItem } from 'primeng/primeng';
export class LabTimes {

    times: SelectItem[];

    selectedTime: string;

    constructor() {
        this.times = [];

        this.times.push({label: '8:15-10:55', value: '08:15 am-10:55 am'});
        this.times.push({label: '8:30-9:20', value: '08:30 am-09:20 am'});
        this.times.push({label: '9:40-10:55', value: '09:40 am-10:55 am'});
        this.times.push({label: '12:15-1:30', value: '12:15 pm-01:30 pm'});
        this.times.push({label: '12:15-2:55', value: '12:15 pm-02:55 pm'});
        this.times.push({label: '12:15-4:20', value: '12:15 pm-04:20 pm'});
        this.times.push({label: '12:30-2:20', value: '12:30 pm-02:20 pm'});
        this.times.push({label: '1:30-4:20', value: '01:30 pm-04:20 pm'});
        this.times.push({label: '1:40-2:55', value: '01:40 pm-02:55 pm'});
        this.times.push({label: '1:40-4:20', value: '01:40 pm-04:20 pm'});
        this.times.push({label: '2:30-4:20', value: '02:30 pm-04:20 pm'});
        this.times.push({label: '3:05-4:20', value: '03:05 pm-04:20 pm'});
        this.times.push({label: '2:30-5:20', value: '02:30 pm-05:20 pm'});
        this.times.push({label: '3:05-4:20', value: '03:05 pm-04:20 pm'});
        this.times.push({label: '6:30-7:30', value: '06:30 pm-07:30 pm'});


    }

}
