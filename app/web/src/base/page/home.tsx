import { Button } from "@fluentui/react-components";
import { useLocal } from "web-utils";
import { page } from "web-init";

export default page({
  url: "/",
  component: ({}) => {
    const local = useLocal({}, async () => {
      const res = await db.user.findFirst();
      console.log(res);
    });

    return (
      <>
        Hello mantap
        <br />
        <Button appearance="primary">Haloha</Button>
      </>
    );
  },
});
