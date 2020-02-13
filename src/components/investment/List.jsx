import React, {useState, useEffect, useContext} from 'react';
import {FaMeh, FaSpinner, FaTrash} from 'react-icons/fa';
import Swal from 'sweetalert2';
import {formatDate} from 'react-day-picker/moment';

import api from 'config/api';
import If from 'helpers/If';
import {InvestmentsContext} from 'context/InvestmentsContext';

export default props => {
  const [investments, setInvestments] = useContext(InvestmentsContext);
  const [fixedInvestments, setFixedInvestments] = useState([]);
  const [variableInvestments, setVariableInvestments] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const deleteInvestment = investment => {
    setisLoading(true);
    (async () => {
      let response = await api.delete(
        `/investments/${investment._id}`,
        investment
      );
    })();

    window.location.reload();
  };

  useEffect(() => {
    function filterInvestments(investments) {
      let fixed = [];
      let variable = [];
      return investments.reduce(function(res, el) {
        if (el.type === 'RENDA_FIXA') {
          fixed.push(el);
        }

        if (el.type === 'RENDA_VARIAVEL') {
          variable.push(el);
        }
        setFixedInvestments(fixed);
        setVariableInvestments(variable);
        setisLoading(false);
        return true;
      }, []);
    }

    if (investments !== null) {
      filterInvestments(investments);
      setisLoading(false);
    }
  }, [investments, setFixedInvestments, setVariableInvestments, isLoading]);

  return (
    <section className="investments-list">
      <If test={isLoading}>
        <FaSpinner className="loading" />
      </If>

      <If test={!isLoading}>
        {fixedInvestments && fixedInvestments.length > 0 ? (
          <table className="table fixed-investments">
            <caption>Investimentos de renda fixa</caption>
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Valor</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {fixedInvestments.map(el => {
                return (
                  <tr key={el._id}>
                    <td>{formatDate(el.date)}</td>
                    <td>R$ {el.value}</td>
                    <td>
                      <span
                        className="investment-action"
                        title="Deletar"
                        aria-label="Deletar Investimento"
                        onClick={() =>
                          Swal.fire({
                            title: 'Oops!',
                            text: 'Deseja realmente excluir o investimento?',
                            icon: 'question',
                            confirmButtonText: 'Sim',
                            cancelButtonText: 'Voltar',
                          }).then(function() {
                            deleteInvestment(el);
                          })
                        }
                      >
                        <FaTrash />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="empty">
            <FaMeh></FaMeh>
            <span>Nenhum investimento de renda fixa.</span>
          </div>
        )}

        {variableInvestments && variableInvestments.length > 0 ? (
          <table className="table variable-investments">
            <caption align="top">Investimentos de renda variável</caption>
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Valor</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {variableInvestments.map(el => {
                return (
                  <tr key={el._id}>
                    <td>{formatDate(el.date)}</td>
                    <td>R$ {el.value}</td>
                    <td>
                      <span
                        className="investment-action"
                        title="Deletar"
                        aria-label="Deletar Investimento"
                        onClick={() =>
                          Swal.fire({
                            title: 'Oops!',
                            text: 'Deseja realmente excluir o investimento?',
                            icon: 'question',
                            confirmButtonText: 'Sim',
                            cancelButtonText: 'Voltar',
                          }).then(function() {
                            deleteInvestment(el);
                          })
                        }
                      >
                        <FaTrash />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="empty">
            <FaMeh></FaMeh>
            <span>Nenhum investimento de renda variável.</span>
          </div>
        )}
      </If>
    </section>
  );
};
