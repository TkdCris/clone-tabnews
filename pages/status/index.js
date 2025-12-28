import useSWR from "swr";
import styles from "./status.module.css";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return <UpdatedAt />;
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Status</h1>
      <div className={styles.updatedAt}>
        Última atualização: {updatedAtText}
      </div>
      <DatabaseStatus isLoading={isLoading} data={data} />
    </div>
  );
}

function DatabaseStatus({ isLoading, data }) {
  if (isLoading || !data) {
    return <div>Carregando sistema...</div>;
  }

  const databaseStatus = data.dependencies.database;

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Database</h2>
      <div className={styles.dataGrid}>
        <div className={styles.dataItem}>
          <span className={styles.label}>Versão</span>
          <span className={styles.value}>{databaseStatus.version}</span>
        </div>
        <div className={styles.dataItem}>
          <span className={styles.label}>Conexões Abertas</span>
          <span className={styles.value}>
            {databaseStatus.opened_connections}
          </span>
        </div>
        <div className={styles.dataItem}>
          <span className={styles.label}>Conexões Máximas</span>
          <span className={styles.value}>{databaseStatus.max_connections}</span>
        </div>
      </div>
    </div>
  );
}
