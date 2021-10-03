import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import Twig from 'twig';

const basePath = dirname(fileURLToPath(new URL(import.meta.url)));

/**
 * Renders a documentation page
 * @param {object} argument.data            Processed and enriched entry from base YAML
 * @param {string} argument.templatePath    Path to the template that should be rendered
 * @returns {Promise}
 */
export default ({ data, templatePath }) => {
    // We do not use renderFile (which is async) to reduce complexity
    const fullTemplatePath = join(basePath, templatePath);
    const { twig } = Twig;
    const template = twig({
        allowInlineIncludes: true,
        data: readFileSync(fullTemplatePath, 'utf8'),
    });
    return template.render(data);
};
