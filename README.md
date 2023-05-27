# louwie-blocks

An assortment of Gutenberg blocks

## Blocks

### Dashicon

A wrapper block around the dashicons available through WordPress, this allows you to add an icon to your site.

#### Options

- Icon - A list of the dashicons
- Size - Size of the icon

![Dashicon demo](./media/dashicon.gif)

### Collapsable Toggle

A wrapper block that adds a click event handler to the nested blocks.
This allows you to turn a link into toggle that will hide/show **Collapsable Content** (see block below).

#### Options

- ID - Unique id that should match the content that should be toggled.
- Group ID - (optional) Group id, incase you want to group content together and only have one open at a time.
- Show Toggle - (optional) Shows a toggle icon.

### Collapsable Content

A wrapper block that labels the nested blocks as toggle content, that will be hidden or shown by a **Collapsable Toggle**.

#### Options

- ID - Unique id that should match the toggle that should hide/show this content.
- Group ID - (optional) Group id, incase you want to group content together and only have one open at a time.
- Show On Toggle - (optional) Whether to show the content on toggle or hide it. 