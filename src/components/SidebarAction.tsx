import React from "react";
import styled from "styled-components";
import Container from "./Container";
import Icon, { IconProps } from "./Icon";
import SidebarListItem from "./SidebarListItem";
import SidebarPill, { PillType } from "./SidebarPill";
import Tooltip from "./Tooltip";

const Wrapper = styled(Container)<{ margin?: boolean; active?: boolean }>`
	${(props) => (props.margin !== false ? "margin-top: 9px;" : "")}};
	padding: 0;
	width: 48px;
	height: 48px;
	border-radius: ${(props) => (props.active ? "30%" : "50%")};
	background-color: ${(props) =>
		props.active ? "var(--primary)" : "var(--background-secondary)"};
	display: flex;
	align-items: center;
	justify-content: center;
	transition: border-radius 0.2s ease, background-color 0.2s ease;

	&:hover {
		border-radius: 30%;
		background-color: var(--primary);
	}
`;

interface Props {
	tooltip?: string;
	action?: () => void;
	image?: React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>;
	icon?: IconProps;
	label?: string;
	margin?: boolean;
	active?: boolean;
}

function SidebarAction(props: Props) {
	if (props.image && props.icon && props.label)
		throw new Error(
			"SidebarAction can only have one of image, icon, or label",
		);

	const [pillType, setPillType] = React.useState<PillType>("none");
	const [isHovered, setHovered] = React.useState(false);

	React.useEffect(() => {
		if (props.active) return setPillType("active");
		else if (isHovered) return setPillType("hover");
		// TODO: unread
		else return setPillType("none");
	}, [props.active, isHovered]);

	return (
		<SidebarListItem>
			<SidebarPill type={pillType} />
			<Tooltip title={props.tooltip} placement="right">
				<Wrapper
					onClick={props.action}
					onMouseEnter={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
					margin={props.margin}
					active={props.active}
				>
					{/* {props.image && <img {...props.image} />} */}
					{props.icon && <Icon {...props.icon} />}
					{/* {props.label && <span>{props.label}</span>} */}
				</Wrapper>
			</Tooltip>
		</SidebarListItem>
	);
}

export default SidebarAction;