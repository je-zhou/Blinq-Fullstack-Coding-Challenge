import BackButton from "./BackButton";
import ManageButton from "./ManageButton";
import ConnectButton from "./ConnectButton";
import DisconnectButton from "./DisconnectButton";
import { MouseEventHandler } from "react";

export interface IButton {
	onClick?: MouseEventHandler | undefined,
	text?: string | undefined,
	isLoading?: boolean,
	type?: 'submit' | 'reset' | 'button' | undefined;
}

export { BackButton, ManageButton, ConnectButton, DisconnectButton }