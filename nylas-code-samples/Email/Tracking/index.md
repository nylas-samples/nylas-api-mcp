## Changes to message tracking

In v3, the following message tracking response fields have been updated:

| **v2**             | **v3**              | **Location**                       |
| ------------------ | ------------------- | ---------------------------------- |
| `tracking`         | `tracking_options`  | Request                            |
| `tracking.payload` | `tracking.label`    | Request and notification           |
| `recents.id`       | `recents.click_id`  | Link Clicked tracking notification |
| `recents.id`       | `recents.opened_id` | Message Open tracking notification |
