import * as React from "react";
import * as ReactDOM from "react-dom";

import { Idea, CurrentUser } from "@fider/models";
import { Gravatar, UserName, Button, DisplayError, SignInControl, TextArea, Form } from "@fider/components/common";
import { SignInModal } from "@fider/components";

import { cache, actions, Failure } from "@fider/services";

interface CommentInputProps {
  idea: Idea;
}

interface CommentInputState {
  content: string;
  error?: Failure;
  showSignIn: boolean;
}

const CACHE_TITLE_KEY = "CommentInput-Comment-";

export class CommentInput extends React.Component<CommentInputProps, CommentInputState> {
  private input!: HTMLTextAreaElement;

  constructor(props: CommentInputProps) {
    super(props);

    this.state = {
      content: (Fider.session.isAuthenticated && cache.get(this.getCacheKey())) || "",
      showSignIn: false
    };
  }

  private getCacheKey(): string {
    return `${CACHE_TITLE_KEY}${this.props.idea.id}`;
  }

  private commentChanged = (content: string) => {
    cache.set(this.getCacheKey(), content);
    this.setState({ content });
  };

  public submit = async () => {
    this.setState({
      error: undefined
    });

    const result = await actions.createComment(this.props.idea.number, this.state.content);
    if (result.ok) {
      cache.remove(this.getCacheKey());
      location.reload();
    } else {
      this.setState({
        error: result.error
      });
    }
  };

  private handleOnFocus = () => {
    if (!Fider.session.isAuthenticated) {
      this.input.blur();
      this.setState({ showSignIn: true });
    }
  };

  private setInputRef = (e: HTMLTextAreaElement) => {
    this.input = e;
  };

  public render() {
    return (
      <>
        <SignInModal isOpen={this.state.showSignIn} />
        <div className={`c-comment-input ${Fider.session.isAuthenticated && "m-authenticated"}`}>
          {Fider.session.isAuthenticated && <Gravatar user={Fider.session.user} />}
          <Form error={this.state.error}>
            {Fider.session.isAuthenticated && <UserName user={Fider.session.user} />}
            <TextArea
              placeholder="Write a comment..."
              field="content"
              value={this.state.content}
              minRows={1}
              onChange={this.commentChanged}
              onFocus={this.handleOnFocus}
              inputRef={this.setInputRef}
            />
            {this.state.content && (
              <Button color="positive" onClick={this.submit}>
                Submit
              </Button>
            )}
          </Form>
        </div>
      </>
    );
  }
}
