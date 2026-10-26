# Agent instructions

## UI rule: state contrast (applies to every UI change)

Before opening a PR that adds or changes any text, icon or control:

- Check it against every background it can appear on: default, selected/active, hover, focus, disabled, and light/dark if both exist.
- In each state, use the same color token as the sibling text in that state (for example, the selected row's foreground token), never a fixed muted color that only works on the default background.
- Meet WCAG contrast: at least 4.5:1 for text and 3:1 for icons and other UI parts.
- State in the PR description which states were checked.
