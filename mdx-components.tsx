import type { MDXComponents } from "mdx/types";
import { Fakta, FaktaMitos } from "./components/mdx/FaktaMitos";
import { KuisMini } from "./components/mdx/KuisMini";
import { Sorotan } from "./components/mdx/Sorotan";

const components: MDXComponents = {
  Fakta,
  FaktaMitos,
  KuisMini,
  Sorotan,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
