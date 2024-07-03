import { ComponentPropsWithRef, ElementType } from "react";

export type PolymorphicRef<E extends ElementType> = ComponentPropsWithRef<E>["ref"];
