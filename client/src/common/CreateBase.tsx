import { Create, SimpleForm, TextInput } from "react-admin";

const CreateBase = () => {
  return (
    <Create>
      <SimpleForm>
        <i>Edit file common/CreateBase.tsx</i>
        <TextInput variant="outlined" source="__test__" disabled />
      </SimpleForm>
    </Create>
  );
};

export default CreateBase;
