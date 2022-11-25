import { LightningElement,api,track,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const FIELDS = [
    'Contact.Name'
];

export default class RecordFormExample extends LightningElement {
    @api recordId;
    @track arrayedit1 = ['FirstName','LastName','BirthDate'];
    @track arrayedit2 = ['Phone','LeadSource'];
    @track arrayedit3 = ['AssistantName','AssistantPhone'];
    @track arrayedit4 = ['CleanStatus','Jigsaw'];
    @track arrayview1 = ['Name','Birthdate'];
    @track arrayview2 = ['Phone','LeadSource'];
    @track arrayview3 = ['AssistantName','AssistantPhone'];
    @track arrayview4 = ['CleanStatus','Jigsaw'];
    //@track arraystr2 = ['Phone','LeadSource'];
    @track isShowModal = false;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }
    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
     }
     handleSuccess(event){
        const payload = event.detail;
        console.log(JSON.stringify(payload));

        const evt = new ShowToastEvent({
            title: 'Opportunity Update',
            message: 'Record : ' + this.contact.data.fields.Name.value,
            variant: 'Success',
        });
        this.isShowModal = false;
        this.dispatchEvent(evt);
    }
}