import React, {useState, useEffect, useContext} from 'react';
import DayPicker from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import 'moment/locale/pt-br';
import Swal from 'sweetalert2';
import $ from 'jquery';

import api from 'config/api';
import {InvestmentsContext} from 'context/InvestmentsContext';

export default props => {
  const [investments, setInvestments] = useContext(InvestmentsContext);
  const [investment, setInvestment] = useState({
    type: 'RENDA_FIXA',
    value: '',
    date: new Date(),
  });

  const handleFormChange = e => {
    switch (e.target.id) {
      case 'investment-type-field':
        setInvestment({...investment, type: e.target.value});
        break;

      case 'investment-value-field':
        const formattedValue = parseFloat(e.target.value)
          .toFixed(2)
          .toString();

        setInvestment({
          ...investment,
          value: formattedValue.includes(',')
            ? parseFloat(formattedValue.replace(',', '.'))
            : parseFloat(formattedValue),
        });
        break;

      default:
        return false;
    }
  };

  const save = (e, investment) => {
    e.preventDefault();

    (async () => {
      let response = await api.post(`/investments`, investment);
    })();

    (async () => {
      let response = await api.get(`/investments/`);
      setInvestments(response.data);
    })();
  };

  function handleDayClick(day) {
    setInvestment({...investment, date: day});
  }

  return (
    <>
      <form onSubmit={e => save(e, investment)} className="investment-form">
        <div className="input-group">
          <label htmlFor="investment-type-field">Tipo de Investimento</label>
          <select
            className="form-control"
            onChange={e => handleFormChange(e)}
            id="investment-type-field"
            value={investment.type}
          >
            <option value="RENDA_FIXA">Renda Fixa</option>
            <option value="RENDA_VARIAVEL">Renda Variável</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="investment-value-field">Valor do Investimento</label>
          <input
            className="form-control"
            id="investment-value-field"
            onChange={e => handleFormChange(e)}
            type="number"
            placeholder="Use vírgula (,) como casa decimal."
            value={investment.value}
          ></input>
        </div>

        <div className="input-group">
          <label htmlFor="investment-date-field">Data</label>
          <DayPicker
            id="investment-date-field"
            onDayChange={handleDayClick}
            formatDate={formatDate}
            selectedDay={investment.date}
            hideOnDayClick={true}
            parseDate={parseDate}
            format="LL"
            placeholder={`${formatDate(new Date(), 'LL', 'pt-br')}`}
            dayPickerProps={{
              locale: 'pt-br',
              localeUtils: MomentLocaleUtils,
            }}
          />
        </div>

        <button
          onClick={() =>
            Swal.fire({
              title: 'Sucesso!',
              text: 'O investimento foi registrado com sucesso',
              icon: 'success',
              confirmButtonText: 'Voltar',
            }).then(function() {
              $('#investmentFormModal').modal('hide');
            })
          }
          className="btn btn-action"
          type="submit"
        >
          Salvar
        </button>
      </form>
    </>
  );
};
