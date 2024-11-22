"use client";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import {
  Persister,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { ReactNode, useEffect, useState } from "react";

export const ReactQueryProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [persister, setPersister] = useState<Persister>(() =>
    createSyncStoragePersister({
      storage: undefined,
    })
  );

  useEffect(() => {
    setPersister(() =>
      createSyncStoragePersister({
        storage: window.localStorage,
      })
    );
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
