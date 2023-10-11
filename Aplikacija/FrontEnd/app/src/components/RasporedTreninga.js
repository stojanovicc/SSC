import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Modal, Form, Input, Button } from 'antd';
import { DateTimePicker } from '@mui/lab';

const RasporedTreninga = () => {
  const [raspored, setRaspored] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [noviTermin, setNoviTermin] = useState({ datum: '', vreme: '', mesto: '' });

  useEffect(() => {
    dobaviRasporedTreninga();
  }, []);

  const dobaviRasporedTreninga = async () => {
    try {
      const response = await axios.get('http://localhost:7240/Trener/PreuzmiTreninge');
      setRaspored(response.data);
    } catch (error) {
      console.error('Greška prilikom dobavljanja rasporeda treninga:', error);
    }
  };

  const dodajTerminTreninga = async () => {
    try {
      const response = await axios.post('http://localhost:7240/Trener/DodajTrening', noviTermin);
      console.log('Termin treninga je uspešno dodat:', response.data);
      dobaviRasporedTreninga();
      setModalVisible(false);
      setNoviTermin({ datum: '', vreme: '', mesto: '' });
    } 
    catch (error) {
      console.error('Greška prilikom dodavanja termina treninga:', error);
    }
  };

  const prikaziModal = (date) => {
    setModalVisible(true);
    setNoviTermin({ datum: date.format('YYYY-MM-DD'), vreme: '', mesto: ''});
  };

  return (
    <div>
      <Button onClick={() => setModalVisible(true)}>Dodaj termin treninga</Button>
      <Calendar onSelect={prikaziModal} />
      <Modal
        title="Dodaj novi termin treninga"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={dodajTerminTreninga}
      >
        <Form>
          {/* <Form.Item label="Datum">
            <Input disabled value={noviTermin.datum} />
          </Form.Item> */}
          <Form.Item label="Vreme">
            <Input value={noviTermin.vreme} onChange={e => setNoviTermin({ ...noviTermin, vreme: e.target.value })} />
          </Form.Item>
          <Form.Item label="Mesto">
            <Input value={noviTermin.mesto} onChange={e => setNoviTermin({ ...noviTermin, mesto: e.target.value })} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RasporedTreninga;
