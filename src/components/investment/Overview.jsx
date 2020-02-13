import React, {useEffect, useState, useContext} from 'react';
import Chart from 'react-apexcharts';
import {FaSpinner} from 'react-icons/fa';

import If from 'helpers/If';
import CalcPercentage from 'helpers/CalcPercentage';
import {InvestmentsContext} from 'context/InvestmentsContext';

export default props => {
  const [investments, setInvestments] = useContext(InvestmentsContext);
  // Array Order: Total Investments, Total Fixed Investments, Total Variable Investments
  const [sumInvestments, setSumInvestments] = useState([0, 0, 0]);
  const [isLoading, setisLoading] = useState(true);
  const [graphData = {}, setGraphData] = useState();

  useEffect(() => {
    setisLoading(true);
    function filterInvestments(investments) {
      let totalInvestments = 0;
      let sumFixedIvestments = 0;
      let sumvariableInvestments = 0;
      return investments.reduce(function(res, el) {
        totalInvestments += parseFloat(el.value);

        if (el.type === 'RENDA_FIXA') {
          sumFixedIvestments += parseFloat(el.value);
        }

        if (el.type === 'RENDA_VARIAVEL') {
          sumvariableInvestments += parseFloat(el.value);
        }
        setSumInvestments([
          totalInvestments,
          sumFixedIvestments,
          sumvariableInvestments,
        ]);

        return true;
      }, []);
    }

    if (investments !== null) {
      filterInvestments(investments);
      setGraphData({
        series: [
          {
            data: [sumInvestments[1], sumInvestments[2]],
          },
        ],
        options: {
          colors: ['#33c47c'],
          chart: {
            type: 'bar',
            height: 250,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: ['Renda Fixa', 'Renda Variável'],
          },
          yaxis: {
            show: false,
          },
        },
      });

      setisLoading(false);
    }
  }, [investments, setSumInvestments, isLoading]);

  return (
    <section className="app-overview-container">
      <h3 className="app-overview-title">Visão Geral</h3>

      <If test={isLoading}>
        <FaSpinner className="loading" />
      </If>

      <If test={!isLoading}>
        <div className="app-overview">
          <Chart
            options={graphData.options}
            series={graphData.series}
            className="graph"
            type="bar"
            height={250}
            width={300}
          />

          <div className="statistics">
            <div className="statistic-1">
              <span>
                <CalcPercentage
                  absolute={sumInvestments[0]}
                  value={sumInvestments[1]}
                />
              </span>
              Renda Fixa
            </div>
            <div className="statistic-2">
              <span>
                <CalcPercentage
                  absolute={sumInvestments[0]}
                  value={sumInvestments[2]}
                />
              </span>
              Renda Variável
            </div>
            <button
              type="button"
              className="btn btn-action"
              data-toggle="modal"
              data-target="#investmentFormModal"
            >
              Novo Investimento
            </button>
          </div>
        </div>
      </If>
    </section>
  );
};
