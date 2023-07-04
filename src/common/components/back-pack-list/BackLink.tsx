import { styled } from "@mui/material/styles";

type BackLinkLinkPropsType = {
  colorText?: string
  align?: string
  justifyContent?: string
  fontWeight?: number
}

export const BackLink = styled("span")<BackLinkLinkPropsType>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  width: 100%;

  a {
    color: ${({ colorText }) => colorText || "#366EFF"};
    font-weight: ${({ fontWeight }) => fontWeight || 400};
    line-height: 24px;
    font-size: 20px;
    text-align: ${({ align }) => align || "center"};
    text-decoration: none;

  }
`;