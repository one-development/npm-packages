# React Component Guidelines

## Styling

A component, like any function, should strive to be pure. This means that it should not be able to impact the components around it through side effects. Margins are a side-effect, so components should _never_ include margins. Instead, all styling should be isolated within the root node for that component. If a component is commonly positioned in a certain way, you should consider creating a parent layout component. Examples of layout components include `RadioGroup`, `Stack`, or `Stepper`.

## Composition

- There may be some API inconsistency with how various components support composition. The following rules are used to guide composition APIs.
- Prefer using the children prop because it is the idiomatic way to handle composition in React. For instances that require limited child composition, it is better to provide explicit properties because they are simpler and more performant. For example, a Tab component might take an icon and a label property over TabIcon and TabLabel children. In this example, the former approach is preferred because there are few permutations of a Tab component’s children.
- API consistency matters

## API Rules

We enforce the following API design rules:

#### Native Properties

We avoid documenting native properties supported by the DOM, like tabIndex, unless they are relevant to the component. For example, a Button component should document onClick, but a Text component should not.

#### Spread

Any undocumented properties supplied to a component are spread to its root element. For example, the tabIndex or aria-label properties are applied to the root.

#### Property Naming

###### Prefer Semantic HTML

Wherever possible, props should be similar to semantic HTML attributes. For example, an Input component should accept a disabled prop, rather than isDisabled.

###### Be Concise

Additionally, prop names should be only as explicit as is required for the given context. For example, imagine a Radio component that can render a label.

```javascript
// Good
<Radio label='red' />

// Bad
<Radio radioLabel='red' />
```

In this example, it’s better to use label than radioLabel, because it is clear from context that this label is for the Radio. It is therefore unnecessary and needlessly explicit to prefix the prop name with “radio”.

By contrast, imagine that an Input component supports two icons, one at the start, and one at the end.

```javascript
// Good
<Input startIcon={userIcon} endIcon={checkIcon} />

// Bad
<Input icon={userIcon} endIcon={checkIcon} />
```

In this example, it is necessary to be more explicit with the prop names so that a user can distinguish between the start and end icons.

###### Boolean Props

The name of a Boolean property should be chosen based on that property’s default value. For example, the disabled attribute on an input element, if supplied, will default to true. This choice allows the shorthand notation:

```javascript
// Good
<Input disabled />

// Bad
<Input enabled={false} />
```

Furthermore, a Boolean prop should always be an adjective, describing the component's state or customization. Here are some examples:

```javascript
<Input disabled />
<Checkbox checked />
<Button fullWidth />
<Divider vertical />
<Space inline />
```

###### Controlled Components

In general, controlled components should use the idiomatic `value` and `onChange` properties. However, properties that control display related state may use alternate names, like `open` / `onClose` / `onOpen`. In all cases, handlers should be prefixed with `on`, followed by the verb in simple future tense, like `onClick`.

###### Refs

Components should always accept `ref` via `React.forwardRef`. The `ref` should always forwarded to the root element. This means that, without changing the rendered root element, it is always forwarded to the outermost DOM element rendered by the component.

###### Booleans vs Enums

There are two ways to design an API that handles the variations of a component:

1. accept a Boolean
2. accept an Enum.

Each option has pros and cons. For example, here is a Button component that supports multiple variations:

Option 1: Boolean

```javascript
type ButtonProps = {
  raised: boolean,
  flat: boolean,
  outline: boolean,
}
```

This option enables a shorthand notations: `<Button>`, `<Button raised />`, `<Button flat />`, or `<Button outline />`. However, it also allows invalid configurations: `<Button raised flat />`.

Option 2: Enum

```javascript
type ButtonProps = {
  variant: 'text' | 'raised' | 'flat' | 'outline',
}
```

This option is more verbose, but it reduces 3 properties to 1, allows for new properties to be supported with backwards compatibility, and prevents invalid configuration.

Both options are appropriate in different situations. Therefore, the following rules should be used:

- Use a boolean when 2 degrees of freedom are required
- Use an enum is used when > 2 degrees of freedom are required
- Use an enum if there’s any possibility that > 2 degrees of freedom may be required in the future
- Since the previous example requires 4 degrees of freedom, we should use an enum
