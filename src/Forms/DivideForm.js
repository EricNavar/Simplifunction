import React from 'react';

function DivideForm(props) {
  const [parameters, setParameters] = React.useState(["",""]);
  //The only purpose of the parameterCount state is so that the list
  //of parameters update when the "Add parameter" button is clicked.
  const [parameterCount, setParameterCount] = React.useState(["",""]);

  const addParameter = () => {
    let newParameters = parameters;
    newParameters.push("");
    setParameters(newParameters);
    setParameterCount(parameterCount + 1);
  }

  const onChange = (e,index) => {
    parameters[index] = e.target.value;
    props.setFormula(createFormula());
  }

  const createFormula = () => {
    let formula = "=";
    parameters.forEach((parameter,index) => {
      if (index !== 0)
        formula = formula + "/";
      formula = formula + parameter
    });
    return formula;
  };

  return (
    <div>
      {parameters.map((parameter, index) => 
        <div key={`max-form-${index}`}>
          <label >{`Parameter ${index + 1}`}</label>
          <input type="text" id="fname" name="fname" onChange={e=>onChange(e,index)} />
          <br /><br />
        </div>
      )}
      <button onClick={addParameter}>
        + Add parameter
      </button>
    </div>
  );
}

export { DivideForm };
