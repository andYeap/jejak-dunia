import type { MDXComponents } from "mdx/types";
import { Fakta, FaktaMitos } from "./components/mdx/FaktaMitos";
import { Sorotan } from "./components/mdx/Sorotan";

const components: MDXComponents = {
  Fakta,
  FaktaMitos,
  Sorotan,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
