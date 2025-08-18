import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/FormikForm";

function App() {
  return (
    <div>
      {/* Controlled component */}
      <RegistrationForm />

      {/* Formik component */}
      <FormikForm />
    </div>
  );
}

export default App;
