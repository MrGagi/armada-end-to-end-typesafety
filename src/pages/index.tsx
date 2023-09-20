import Head from "next/head";

import { api } from "~/utils/api";
import styles from "./index.module.css";
import { Form } from "./Form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Logo } from "~/components/Logo";

export default function Home() {
  const { data: tags, refetch } = api.tags.get.useQuery();

  return (
    <>
      <Head>
        <title>Tags</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <Logo />
        </div>
        <div className={styles.container}>
          <Form onCreate={refetch} />
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Existing tags</CardTitle>
            </CardHeader>
            <CardContent>
              {!tags?.length && <p>No tags</p>}
              {tags?.map((tag) => {
                return (
                  <div key={tag.id}>
                    <span>
                      <strong>Name:</strong> {tag.name}
                    </span>
                    <p>
                      <strong>Values:</strong>{" "}
                      {tag.values?.map((value) => value.name).join(",")}
                    </p>
                    <Separator className="mt-3 mb-3" />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
