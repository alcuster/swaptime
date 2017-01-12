import { SelectItem } from 'primeng/primeng';
export class Departments {

    departments: SelectItem[];

    selectedDept: string;

    constructor() {
        this.departments = [];
        this.departments.push({label: 'Africana Studies (AFR)', value: 'AFR'});
        this.departments.push({label: 'Anthropology (ANT)', value: 'ANT'});
        this.departments.push({label: 'Arabic (ARB)', value: 'ARB'});
        this.departments.push({label: 'Art (ART)', value: 'ART'});
        this.departments.push({label: 'Biology (BIO)', value: 'BIO'});
        this.departments.push({label: 'Chemistry (CHE)', value: 'CHE'});
        this.departments.push({label: 'Chinese (CHI)', value: 'CHI'});
        this.departments.push({label: 'Classics (CLA)', value: 'CLA'});
        this.departments.push({label: 'Communication Studies (COM)', value: 'COM'});
        this.departments.push({label: 'Computer Science (CSC)', value: 'CSC'});
        this.departments.push({label: 'Ctr for Interdisciplinary Studies (CIS)', value: 'CIS'});
        this.departments.push({label: 'Dance (DAN)', value: 'DAN'});
        this.departments.push({label: 'Digital Studies (DIG)', value: 'DIG'});
        this.departments.push({label: 'Economics (ECO)', value: 'ECO'});
        this.departments.push({label: 'Education (EDU)', value: 'EDU'});
        this.departments.push({label: 'English (ENG)', value: 'ENG'});
        this.departments.push({label: 'Environmental Studies (ENV)', value: 'ENV'});
        this.departments.push({label: 'Ethics (ETH)', value: 'ETH'});
        this.departments.push({label: 'Film & Media Studies (FMS)', value: 'FMS'});
        this.departments.push({label: 'French (FRE)', value: 'FRE'});
        this.departments.push({label: 'Gender & Sexuality Studies (GSS)', value: 'GSS'});
        this.departments.push({label: 'German', value: 'GER'});
        this.departments.push({label: 'Global Literary Theory', value: 'LIT'});
        this.departments.push({label: 'Greek (GRE)', value: 'GRE'});
        this.departments.push({label: 'Health and Human Values', value: 'HHV'});
        this.departments.push({label: 'History (HIS)', value: 'HIS'});
        this.departments.push({label: 'Latin (LAT)', value: 'LAT'});
        this.departments.push({label: 'Latin American Studies (LAS)', value: 'LAS'});
        this.departments.push({label: 'Mathematics (MAT)', value: 'MAT'});
        this.departments.push({label: 'Military Science (MIL)', value: 'MIL'});
        this.departments.push({label: 'Music (MUS)', value: 'MUS'});
        this.departments.push({label: 'Philosophy (PHI)', value: 'PHI'});
        this.departments.push({label: 'Physics (PHY)', value: 'PHY'});
        this.departments.push({label: 'Political Science (POL)', value: 'POL'});
        this.departments.push({label: 'Psychology (PSY)', value: 'PSY'});
        this.departments.push({label: 'Religion (REL)', value: 'REL'});
        this.departments.push({label: 'Russian (RUS)', value: 'RUS'});
        this.departments.push({label: 'Sociology (SOC)', value: 'SOC'});
        this.departments.push({label: 'Spanish (SPA)', value: 'SPA'});
        this.departments.push({label: 'Theatre (THE)', value: 'THE'});
        this.departments.push({label: 'Writing Program (WRI)', value: 'WRI'});

    }

}
