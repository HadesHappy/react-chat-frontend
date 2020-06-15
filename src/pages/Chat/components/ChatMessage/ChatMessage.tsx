import React, { PureComponent } from "react";
import classes from "./ChatMessage.css";
import cn from "clsx";
import Typography from "src/components/ui-kit/Typography";
import TimeDisplay from "src/components/TimeDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface ChatMessageProps {
  text: string;
  type: "inbox" | "outbox";
  username: string;
  createdAt: Date;
  status: "none" | "receivedByServer";
}

class ChatMessage extends PureComponent<ChatMessageProps> {
  render(): React.ReactNode {
    const { createdAt, type, username, text } = this.props;

    return (
      <div
        className={cn(classes.container, {
          [classes.inbox]: type === "inbox",
          [classes.outbox]: type === "outbox",
        })}
      >
        <Typography
          color="muted"
          gutterBottom={false}
          size="small"
          className={cn(classes.username)}
        >
          {username}
        </Typography>
        <div className={cn(classes.bubbleContainer)}>
          <div className={cn(classes.triangle)} />
          <div className={cn(classes.bubble)}>
            <Typography gutterBottom={false}>{text}</Typography>
          </div>

          <Typography
            color="muted"
            className={cn(classes.date)}
            gutterBottom={false}
            size="small"
          >
            <>
              {this.getStatusIcon()} <TimeDisplay date={createdAt} />
            </>
          </Typography>
        </div>
      </div>
    );
  }

  private getStatusIcon = () => {
    const { status, type } = this.props;
    if (status === "receivedByServer" && type === "outbox") {
      return <FontAwesomeIcon icon={faCheck} />;
    }
    return null;
  };
}

export default ChatMessage;
