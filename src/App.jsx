import React, { useState, useEffect } from 'react';

const PartialsFrame = ({ capital, partialsNbr }) => {
  const [percentages, setPercentages] = useState(Array(partialsNbr).fill(50));
  const [rrEntries, setRREntries] = useState(Array(partialsNbr).fill(3));
  const [partiels, setPartiels] = useState([]);
  const [total, setTotal] = useState(0);
  const [fullTp, setFullTp] = useState(0);

  const handleInputChange = (index, type, value) => {
    if (type === 'percent') {
      const newPercentages = [...percentages];
      newPercentages[index] = value;
      setPercentages(newPercentages);
    } else if (type === 'rr') {
      const newRREntries = [...rrEntries];
      newRREntries[index] = value;
      setRREntries(newRREntries);
    }
  };

  useEffect(() => {
    const calculatePartiels = () => {
      const newPartiels = [];
      let newTotal = 0;
      let newFullTp = 0;

      for (let i = 0; i < partialsNbr; i++) {
        const pourcentage = percentages[i];
        const rendement = rrEntries[i];

        const partiel = (pourcentage / 100) * capital * rendement;
        newPartiels.push(partiel);
        newTotal += partiel;

        if (newFullTp === 0) {
          newFullTp = capital * rendement;
        }
      }

      setPartiels(newPartiels);
      setTotal(newTotal);
      setFullTp(newFullTp);
    };

    calculatePartiels();
  }, [capital, partialsNbr, percentages, rrEntries]);

  useEffect(() => {
    // Adjust the arrays when the number of partiels changes
    setPercentages(prevPercentages => {
      const newPercentages = [...prevPercentages.slice(0, partialsNbr)];
      for (let i = prevPercentages.length; i < partialsNbr; i++) {
        newPercentages.push(50);
      }
      return newPercentages;
    });
  
    setRREntries(prevRREntries => {
      const newRREntries = [...prevRREntries.slice(0, partialsNbr)];
      for (let i = prevRREntries.length; i < partialsNbr; i++) {
        newRREntries.push(3);
      }
      return newRREntries;
    });
  }, [capital, partialsNbr]);
  

  return (
    <div style={styles.partialsFrame}>
      {Array.from({ length: partialsNbr }, (_, index) => (
        <div key={index} style={styles.partialsItem}>
          <label style={styles.label}>{`Partiel n°${index + 1}`}</label>
          <input
            type="text"
            value={percentages[index]}
            onChange={(e) => handleInputChange(index, 'percent', e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            value={rrEntries[index]}
            onChange={(e) => handleInputChange(index, 'rr', e.target.value)}
            style={styles.input}
          />
          <span style={styles.result}>{partiels[index] !== undefined ? partiels[index].toFixed(2) : 0}</span>
        </div>
      ))}
      <div style={styles.totalResult}>
        <span style={styles.resultLabel}>Total :</span>
        <span style={styles.result}>{total.toFixed(2)}</span>
      </div>
      <div style={styles.totalResult}>
        <span style={styles.resultLabel}>Premier TP à 100% :</span>
        <span style={styles.result}>{fullTp.toFixed(2)}</span>
      </div>
    </div>
  );
};

const App = () => {
  const [nbrResult, setNbrResult] = useState(4);
  const [capital, setCapital] = useState(1000);

  const updateSliderResult = (e) => {
    setNbrResult(parseInt(e.target.valueAsNumber, 10));
  };

  const handleCapitalChange = (e) => {
    setCapital(parseInt(e.target.value, 10));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <label style={styles.headerLabel}>Combien de partiels ?</label>
        <input
          type="range"
          min="1"
          max="4"
          step="1"
          value={nbrResult}
          onChange={updateSliderResult}
          style={styles.slider}
        />
        <p style={styles.sliderValue}>{`Vous devez configurer ${nbrResult} partiels`}</p>

        {/* Ajout de l'input pour le "Capital de départ" */}
        <label style={styles.headerLabel}>Capital risqué :</label>
        <input
          type="number"
          value={capital}
          onChange={handleCapitalChange}
          style={styles.input}
        />
      </div>

      <PartialsFrame capital={capital} partialsNbr={nbrResult} />
      
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '45%',
    margin: '0 auto',
    backgroundColor: '#e0e0e0',
  },
  header: {
    backgroundColor: '#3498db',
    padding: '10px',
    borderRadius: '8px',
    color: 'white',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  headerLabel: {
    marginRight: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  slider: {
    width: '80%',
    margin: '10px 0',
  },
  sliderValue: {
    fontSize: '16px',
  },
  partialsFrame: {
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '8px',
    marginTop: '20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  partialsItem: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    marginRight: '10px',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    width: '30%',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  result: {
    marginLeft: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  totalResult: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  resultLabel: {
    marginRight: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  calculateButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    marginTop: '20px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default App;