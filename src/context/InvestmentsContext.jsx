import React, {createContext, useState, useEffect} from 'react';

import api from 'config/api';

export const InvestmentsContext = createContext();

export const InvestmentsProvider = props => {
  const [investments, setInvestments] = useState(null);

  useEffect(() => {
    (async () => {
      let response = await api.get(`/investments/`);
      setInvestments(response.data);
    })();
  }, [setInvestments]);

  return (
    <InvestmentsContext.Provider value={[investments, setInvestments]}>
      {props.children}
    </InvestmentsContext.Provider>
  );
};
