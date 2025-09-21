import { Suspense, type ComponentType } from "react";
import Loader from "./Loader";

export default function Loadable<T extends object>(
  Component: ComponentType<T>
) {
  const WrappedComponent = (props: T) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

  return WrappedComponent;
}
