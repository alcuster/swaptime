import { SelectItem } from 'primeng/primeng';
export class Times {

    times: SelectItem[];

    selectedTime: string;

    constructor() {
        this.times = [];
        this.times.push({label: '8:15-9:40', value: '08:15 am-09:40 am'});
        this.times.push({label: '8:30-9:20', value: '08:30 am-09:20 am'});
        this.times.push({label: '9:30-10:20', value: '09:30 am-10:20 am'});
        this.times.push({label: '9:40-10:55', value: '09:40 am-10:55 am'});
        this.times.push({label: '10:30-11:20', value: '10:30 am-11:20 am'});
        this.times.push({label: '11:30-12:20', value: '11:30 am-12:20 am'});
        this.times.push({label: '12:15-1:30', value: '12:15 am-1:30 am'});
        this.times.push({label: '12:30-1:20', value: '12:30 am-12:20 am'});
        this.times.push({label: '1:40-2:55', value: '01:40 am-2:55 am'});
    }

}
