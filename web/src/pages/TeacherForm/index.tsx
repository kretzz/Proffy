import React, {useState, FormEvent} from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');


    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: ''}
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: ''}
        ]);
        scheduleItems.push()
    }


    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems =  scheduleItems.map((scheduleItem , index) => {
            if(index === position)  {
                return {...scheduleItem, [field]: value}
            }
            return scheduleItem
        });

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(e: FormEvent) {

        e.preventDefault();
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Success!');

            history.push('/')
        }).catch(() => {
            alert('Error')
        });
    }



    return ( 
        
        <div id="page-teacher-form" className="container">
            <PageHeader title="It's incredible you want to give classes" description="The first step is to fill the signup form"/>
        
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Your Personal Data</legend>

                        <Input 
                            type="text" 
                            name="name" 
                            label="Full name" 
                            value={name} 
                            onChange={(e) => { setName(e.target.value) }}
                        ></Input>
                        <Input 
                            type="text" 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        ></Input>
                        <Input 
                            type="text" 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        ></Input>
                        <Textarea 
                            name="bio" 
                            label="Biography"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        ></Textarea>


                    </fieldset>


                    <fieldset>
                        <legend>About the class</legend>

                        <Select 
                            name="subject" 
                            label="Subject"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                {value: 'Arts', label: 'Arts'},
                                {value: 'Science', label: 'Science'},
                                {value: 'Mathematics', label: 'Mathematics'},
                            ]}
                        ></Select>
                        <Input 
                            type="number" 
                            name="cost" 
                            label="Cost per hour"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}></Input>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Available Time

                            <button type="button" onClick={addNewScheduleItem}>
                                + new hour
                            </button>
                        </legend>
                        
                        {scheduleItems.map((scheduleItem, index) => {
                            return(

                                <div key={scheduleItem.week_day} className="schedule-item">
                                        
                                    <Select 
                                        name="week_day" 
                                        label="Week day"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value) }
                                        options={[
                                            {value: '0', label: 'Sunday'},
                                            {value: '1', label: 'Monday'},
                                            {value: '2', label: 'Tuesday'},
                                            {value: '3', label: 'Wednesday'},
                                            {value: '4', label: 'Thursday'},
                                            {value: '5', label: 'Friday'},
                                            {value: '6', label: 'Saturday'},
                                        ]}
                                    />
                                    <Input 
                                        name="from" 
                                        label="From" 
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value) }
                                    ></Input>
                                    <Input 
                                        name="to" 
                                        label="To" 
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value) }
                                    ></Input>
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Warning"/>
                            Important! <br/>
                            Fill all the inputs
                        </p>
                        <button type="submit">
                            Save
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;