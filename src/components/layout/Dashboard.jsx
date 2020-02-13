import React, {useEffect, useContext} from 'react';

import Overview from 'components/investment/Overview';
import Form from 'components/investment/Form';
import List from 'components/investment/List';

export default props => {
  return (
    <>
      <div
        className="modal fade"
        id="investmentFormModal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Novo Investimento</h5>
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>

      <Overview></Overview>
      <List></List>
    </>
  );
};
